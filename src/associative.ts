import {Predicate, Map, Associative} from './type'
import {zip} from './list'
import {isArray, isAssociative, isFunction, isNumber, isObject, isUndefined} from './predicate'
import {copy} from './collection'
import {flatMap, range} from './array'
import {identity} from './core';


// Written with Thomas Kleinke
export function get<A>(i: number, defaultValue?: A|undefined): (as: Array<A>) => A|undefined;
export function get<T>(i: string, defaultValue?: T|undefined): (as: Map<T>) => T|undefined;
export function get<T>(i: number|string, alternative?: T|undefined) {

    return (as: Array<T>|Map<T>): T|undefined => {

        const result = (as as any)[i]
        return result !== undefined ? result : alternative
    };
}


export function dissoc(key: string|number): {
    <T>(struct: Map<T>): Map<T>
    <A>(struct: Array<A>): Array<A>
}
export function dissoc<A>(key: number, as: Array<A>): Array<A>;
export function dissoc<A>(key: string, as: Map<A>): Map<A>;
export function dissoc<T>(key: any, as?: any): any {

    const inner = (struct: any): any => {

        const newStruct = copy(struct as any)
        if (isArray(struct)) (newStruct as any).splice(key, 1)
        else delete (newStruct as any)[key]
        return newStruct
    }

    return as === undefined
        ? inner
        : inner(as)
}


export function update<T>(key: string|number, f: (_: T) => T) {

    return (struct: any): any => {

        const newStruct = copy(struct as any);
        (newStruct as any)[key] = f((newStruct as any)[key])
        return newStruct
    }
}


export function assoc<T>(key: string, value: T|(() => T)): (struct: Map<T>) => Map<T>;
export function assoc<A>(key: number, value: A|(() => A)): (struct: Array<A>) => Array<A>;
export function assoc<T>(key: string|number, value: T|(() => T)) {

    return (struct: Map<T>|Array<T>) => {

        const newStruct = copy(struct as any);
        (newStruct as any)[key] = isFunction(value) ? (value as any)() : value
        return newStruct
    }
}


export function lookup<T>(struct: Map<T>, alternative?: T): (targetId: string) => T|undefined;
export function lookup<A>(struct: Array<A>, alternative?: A): (targetId: number) => A|undefined;
export function lookup<A>(struct: Map<A>|Array<A>, alternative?: any) {

    return (targetId: string|number): A|undefined => {

        const result = (struct as any)[targetId]
        return result !== undefined ? result : alternative
    }
}


export function keysAndValues<A>(as: Array<A>): Array<[number, A]>;
export function keysAndValues<T>(o: Map<T>): Array<[string, T]>;
export function keysAndValues<T>(o: Map<T>|Array<T>): Array<[string|number, T]> {

    return zip(keys(o))(Object.values(o)) as Array<[string, T]>
}


export function keys<T>(as: Array<T>): number[];
export function keys(o: Map<any>): string[];
export function keys<T>(t: Array<T>|Map<any>): number[]|string[] {

    return isArray(t)
        ? range(t.length)
        : Object.keys(t)
}


export function values<A>(as: Array<A>): Array<A>;
export function values<T>(o: Map<T>): Array<T>;
export function values<T>(t: Map<T>|Array<T>): Array<T> {

    return isArray(t)
        ? t as Array<T>
        : Object.values(t)
}


/* internal */ export const mapProperties = <A, B>(f: (_: A) => B) =>
    (keys: Array<number|string>, o: Map<A>): Map<B> =>
        keys.reduce(mapPropertiesReducer(f)(o), {})


const mapPropertiesReducer = <A, B>(f: (_: A) => B) =>
    (o: any) => (acc: any, val: string) => (acc[val] = f(o[val]), acc)


const filterObj = <T>(predicate: Predicate<T>): (_: Map<T>) => Map<T> =>
    (o: Map<T>) =>
        Object
            .keys(o)
            .reduce((acc: Map<T>, key: string|number) => {
                if (predicate(o[key])) acc[key] = o[key]
                return acc
            }, {})


export function map<A = any, B = A >(f: (_: A) => B): (as: Associative<A>) => Associative<B> // TODO maybe remove any casts in subsequent examples, it seems to not bring many benefits and maybe drawbacks, as the flatten example showed
export function map<A = any, B = A>(f: (_: A, i: number) => B): (as: Array<A>) => Array<B>
export function map<A = any, B = A>(f: (_: A, key: string) => B): (as: Map<A>) => Map<B>
export function map<A = any, B = A>(f: (_: A, i: number) => B, as: Array<A>): Array<B>
export function map<A = any, B = A>(as: Array<A>, f: (_: A, i: number) => B): Array<B>
export function map<A = any, B = A>(f: (_: A, i: string) => B, as: {[prop: string]: A}): Map<B>
export function map<A = any, B = A>(as: {[prop: string]: A}, f: (_: A, i: string) => B): Map<B>
export function map<A, B>(first: any, ...rest: any[]): any {

    if (rest.length > 1) {
        throw 'illegal argument - in \'map\': first argument list can have at most two arguments'
    }
    if (rest.length === 0 && !isFunction(first)) {
        throw 'illegal argument - in \'map\': argument must be function in one element argument list'
    }
    if (rest.length === 1) {
        if (!
            (isFunction(first) && isAssociative(rest[0])
            || isFunction(rest[0]) && isAssociative(first)))
        throw 'illegal argument - in \'map\': in ' +
        'two element argument list one must be an associative collection and one a function'
    }

    const mappingFunction = isFunction(first)
        ? first
        : rest[0] // typing and guards prevent this to be out of bounds

    const inner = (associativeColl: any): any => {

        if (rest.length === 0 && !isAssociative(associativeColl)) {
            throw 'illegal argument - in \'map\': ' +
            'argument in second argument list must be an associative collection'
        }

        if (isArray(associativeColl)) return (associativeColl as Array<A>).map(mappingFunction) as Array<B>
        else {
            const result: Map<B> = {}
            for (let key of Object.keys(associativeColl)) {
                result[key] = mappingFunction(associativeColl[key], key)
            }
            return result
        }
    }

    return rest.length === 0
        ? inner
        : inner(
            isAssociative(rest[0])
                ? rest[0]
                : first
        )
}


export function forEach<A>(f: (_: A, i?: number|string) => void): {
    (as: Array<A>): Array<A>
    (os: Map<A>): Map<A>
}
export function forEach<A>(f: (_: A, i?: number|string) => void) {

    return (as: any) => {

        if (isArray(as)) {

            let i = 0;
            for (let item of as) {
                (f as any)(item, i)
                i++
            }
            return as as Array<A>

        } else if (isObject(as)) {

            for (let item of keysAndValues(as as any)) {
                (f as any)(item[1], item[0])
            }
            return as as Map<A>
        } else {

            throw 'illegal argument - must be array or object'
        }
    }
}


export function reduce<A, B>(f: (b: B, a: A, i?: number|string) => B, init: B): {
    (as: Array<A>): B
    (os: Map<A>): B
}
export function reduce<T, B>(f: (b: B, t: T, i?: number|string) => B, init: B) {

    return (ts: any): B => {

        if (isArray(ts)) {

            let acc = init;
            let i = 0;
            for (let a of ts) {
                acc = f(acc, a, i)
                i++
            }
            return acc

        } else if (isObject(ts)) {

            const o = ts as Map<T>

            let acc = init
            for (let k of keys(ts)) {
                acc = f(acc, o[k], k)
            }
            return acc

        } else {

            throw 'illegal argument - must be array or object'
        }
    }
}


export function flatten<U, T extends Array<U>>(as: Associative<T>): T;
export function flatten<U, T extends Array<U>>(depth: 1, as: Associative<T>): T;
export function flatten<U, T extends Array<U>>(as: Associative<T>, depth: 1): T;
export function flatten<U, T extends Array<U>>(as: Array<T>, depth: number): T;
export function flatten<U, T extends Array<U>>(depth: number, as: Array<T>): T;
export function flatten<T>(as: Array<T>, depth: number): Array<unknown>;
export function flatten(depth: void): <U, T extends Array<U>>(as: Associative<T>) => T;
export function flatten(depth: 1): <U, T extends Array<U>>(as: Associative<T>) => T;
export function flatten(depth: number): <T,R>(as: Array<T>) => Array<R>;
// export function flatten<T>(as: Associative<T>): Array<T>;
export function flatten(p1: any, ...p2: any[]): any {

    if (p2.length > 1) throw 'illegal arguments - in \'flatten\''
    if (p2.length === 1) {
        if (!(
            (isNumber(p1) && isAssociative(p2[0]))
            || (isAssociative(p1) && isNumber(p2[0]))
        )) throw 'illegal arguments - in \'flatten\''
    }

    const _flatten = flatMap(identity as any) as any;

    const inner = (num: number) =>
        (as: Associative) => {

            if (p2.length === 0 && (isNumber(p1)||isUndefined(p1)) && !isAssociative(as)) {
                throw 'illegal arguments - in \'flatten\''
            }

            return num === 1 || num === undefined || isObject(as)
                ? _flatten(values(as))
                : flatten(num - 1)(_flatten(as))
        }

    return p2.length === 0
        ? isNumber(p1)
            ? inner(p1)
            : p1 === undefined
                ? inner(1)
                : inner(1)(p1)
        : isNumber(p1)
            ? inner(p1)(p2[0])
            : inner(p2[0])(p1)
}