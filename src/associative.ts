import {Predicate, Map, Associative, Mapping, Key, Pair} from './type'
import {isArray, isAssociative, isDefined, isFunction, isObject} from './predicate'
import {range, zip} from './array'
import { throwIllegalArgs } from './core'
import { cond } from './composition'

export type Filter<T = any> = Mapping<Associative<T>>

// Written with Thomas Kleinke
// TODO see to, rename to get again
// export function to_a(i: number): <T>(as: Array<T>) => T|undefined

export function update_a<T>(key: string, v: T|Mapping<T>, m: Map<T>): Map<T>
export function update_a<T>(key: number, v: T|Mapping<T>, m: Array<T>): Array<T>
export function update_a<T,V>(key: string, v: V|Mapping<T,V>, m: Map<T>): Map<any>
export function update_a<T,V>(key: number, v: V|Mapping<T,V>, m: Array<T>): Array<any>

export function update_a<T>(key: string, f: Mapping<T>): (m: Map<T>) => Map<T>
export function update_a<T>(key: number, f: Mapping<T>): (m: Array<T>) => Array<T>

export function update_a<T>(key: string, f: any): (m: Map<any>) => Map<unknown>
export function update_a<T>(key: number, f: any): (m: Array<any>) => Array<unknown>
export function update_a<A,B>(key: string, f: Mapping<A,B>): (m: Map<any>) => Map<unknown>
export function update_a<A,B>(key: number, f: Mapping<A,B>): (m: Array<any>) => Array<unknown>

export function update_a<T>(key, arg, arg2?): any {

    const $ = f => asc => {

        const newStruct = copy(asc);
        (newStruct as any)[key] = isFunction(f) ? f((newStruct as any)[key]) : f
        return newStruct
    }

    return arg2 === undefined
        ? $(arg)
        : $(arg)(arg2)
}


export function lookup<T>(struct: Map<T>, alternative?: T): (targetId: string) => T|undefined;
export function lookup<A>(struct: Array<A>, alternative?: A): (targetId: number) => A|undefined;
export function lookup<A>(struct: Map<A>|Array<A>, alternative?: any) {

    return (targetId: string|number): A|undefined => {

        const result = (struct as any)[targetId]
        return result !== undefined ? result : alternative
    }
}


export function keysValues<A>(as: Array<A>): Array<[number, A]>;
export function keysValues<T>(o: Map<T>): Array<[string, T]>;
export function keysValues<T>(o: Map<T>|Array<T>): Array<[string|number, T]> {

    return zip(keys(o) as any, Object.values(o) as any) as Array<[string, T]>
}


export function keys<T>(o: Associative<T>): number[]|string[]
export function keys(t) {

    return isArray(t)
        ? range(t.length)
        : Object.keys(t)
}


export function values<T>(o: Associative<T>): Array<T>
export function values<T>(t) {

    return isArray(t)
        ? t as Array<T>
        : Object.values(t)
}


/* internal */ export const mapProperties = <A, B>(f: (_: A) => B) =>
    (keys: Array<number|string>, o: Map<A>): Map<B> =>
        keys.reduce(mapPropertiesReducer(f)(o), {})


const mapPropertiesReducer = <A, B>(f: (_: A) => B) =>
    (o: any) => (acc: any, val: string) => (acc[val] = f(o[val]), acc)


export function map<A = any, B = A>(f: (_: A, i?: Key) => B): <T,V = T extends Array<A> ? Array<B> : T extends Map<A> ? Map<B> : never>(as: T) => V
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
            throwIllegalArgs('map', 'associative collection', associativeColl)
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


export function forEach<A = any, B = A>(f: (_: A, i?: Key) => B): <T,V = T extends Array<A> ? Array<A> : T extends Map<A> ? Map<A> : never>(as: T) => V
export function forEach<A>(f: (_: A, i: number) => void): (as: Array<A>) => Array<A>
export function forEach<A>(f: (_: A) => void): (as: Array<A>) => Array<A>
export function forEach<A>(f) {

    return (as: any) => {
        if (!isAssociative(as)) throwIllegalArgs('forEach', 'Associative', as)

        let i = 0
        for (let [k,v] of keysValues(as)) {
            f(v, k)
            i++
        }
        return as
    }
}


export function $reduce_a<A, B>(f: (b: B, a: A, i: string) => B, init: B, as: Map<A>): B
export function $reduce_a<A, B>(f: (b: B, a: A) => B, init: B, as: Map<A>): B
export function $reduce_a<A, B>(f: (b: B, a: A, i: number) => B, init: B, as: Array<A>): B
export function $reduce_a<A, B>(f: (b: B, a: A) => B, init: B, as: Array<A>): B
export function $reduce_a<A, B>(as: Map<A>, f: (b: B, a: A, i: string) => B, init: B): B
export function $reduce_a<A, B>(as: Map<A>, f: (b: B, a: A, i) => B, init: B): B
export function $reduce_a<A, B>(as: Array<A>, f: (b: B, a: A, i: number) => B, init: B): B
export function $reduce_a<A, B>(as: Array<A>, f: (b: B, a: A, i) => B, init: B): B
export function $reduce_a<A, B>(f: (b: B, a: A, i?: number|string) => B, init: B): (as: Associative<A>) => B
export function $reduce_a(...args): any {

    const inner = (f, init) => (ts: any) => {

        if (isArray(ts)) {

            let acc = init;
            let i = 0;
            for (let a of ts) {
                acc = f(acc, a, i)
                i++
            }
            return acc

        } else if (isObject(ts)) {

            const o = ts

            let acc = init
            for (let k of keys(ts)) {
                acc = f(acc, o[k], k)
            }
            return acc

        } else {

            throwIllegalArgs('$reduce_a', 'array or object', ts)
        }
    }

    return args.length === 2
        ? inner(args[0], args[1])
        : isFunction(args[0])
            ? inner(args[0], args[1])(args[2])
            : inner(args[1], args[2])(args[0])
}


// variant: infer from predicate instead boxed type
// export function filter<A,T,V = T extends Array<A> ? Array<A> : T extends Map<A> ? Map<A> : never>(f: (_: A, i?: Key) => boolean): (as: T) => V
export function filter<A,T,V = T extends Array<infer A> ? Array<A> : T extends Map<infer A> ? Map<A> : never>(f: (_: A, i?: Key) => boolean): (as: T) => V
export function filter<A>(p: (a: A, i?: number|string) => boolean): (_: Associative<A>) => Associative<A>
export function filter<A>(p: (a: A, i: number) => boolean, as: Array<A>): Array<A>
export function filter<A>(p: (a: A) => boolean, as: Array<A>): Array<A>
export function filter<A>(as: Array<A>, p: (a: A, i: number) => boolean): Array<A>
export function filter<A>(as: Array<A>, p: (a: A) => boolean): Array<A>
export function filter<A>(p: (a: A, i: string) => boolean, as: Map<A>): Map<A>
export function filter<A>(p: (a: A) => boolean, as: Map<A>): Map<A>
export function filter<A>(as: Map<A>, p: (a: A, i: string) => boolean): Map<A>
export function filter<A>(as: Map<A>, p: (a: A) => boolean): Map<A>
export function filter<A>(...args): any {

    const $ = p => cond(
        isAssociative,
        $filter(p),
        as => throwIllegalArgs('filter','array or object', as)) // TODO make curryLast

    return !any(isFunction)(args) // TODO make one arg list version
        ? throwIllegalArgs('filter', 'at least one function', args)
        : args.length === 1
        ? $(args[0])
        : isFunction(args[0])
        ? $(args[0])(args[1])
        : $(args[1])(args[0])
}


export function copy<T>(struct: Array<T>): Array<T>
export function copy<T>(struct: Map<T>): Map<T>
export function copy(struct) {

    return isArray(struct)
        ? [...struct]
        : {...struct}
}


export function count<A>(p: Predicate<A>): {
    (as: Array<A>): number
    (os: Map<A>): number
}
export function count<A>(p: Predicate<A>, as: Array<A>|Map<A>|string): number
export function count<A>(p: Predicate<A>, as?: any): any {
    const inner = (as: Array<A>|Map<A>|string): number => size($filter(p)(as as any) as any)
    return as === undefined
        ? inner
        : inner(as)
}


export function all<T>(p: Predicate<T>) {

    return (as: Array<T>|Map<T>): boolean => {

        return (values(as as any) as any).every(p)
    }
}


export function any<T>(p: Predicate<T>) {

    return (as: Array<T>|Map<T>): boolean => {

        return (values(as as any) as any).some(p)
    }
}


export function prune<T>(o: Map<T>): Map<T>
export function prune<A>(as: Array<A>): Array<A>
export function prune<T>(ts: Array<T>|Map<T>) {

    return $filter(isDefined)(ts as any)
}


export function indices<A>(p: Predicate<A>): {
    (as: Array<A>): number[]
    (as: Map<A>): string[]
}
export function indices<A>(p: Predicate<A>, as: Array<A>): number[]
export function indices<A>(p: Predicate<A>, as: Map<A>): number[]
export function indices<A>(p: Predicate<A>, as?: any): any {

    const inner = (as: any): any => {

        return $reduce_a(
            (indices: number[], a: A, i: number|string) => p(a)
                ? indices.concat([i] as any)
                : indices
            , [])(as)
    }

    return as === undefined
        ? inner
        : inner(as)
}


export function size<A>(as: Array<A>): number
export function size<T>(o: Map<T>): number
export function size<T>(o: Array<T>|Map<T>): number {

    return (isArray(o)
        ? o.length
        : keys(o as any).length) as number
}


export function $filter<A>(...args): any { // TODO always call with single param list

    const $ = p => as => {

        if (isArray(as)) {

            const as1 = []
            let i = 0
            for (let a of as) {
                if (p(a, i)) as1.push(a as never)
                i++
            }

            return as1 as Array<A>
        }
        else if (isObject(as)) {

            const o = as as Map<A>

            const o1: any = {}
            let i = 0
            for (let k of keys(o)) {
                if (p(o[k], k)) o1[k] = o[k]
                i++
            }

            return o1 as Map<A>

        } else throw 'FATAL'
    }

    return args.length === 1
        ? $(args[0])
        : isFunction(args[0])
            ? $(args[0])(args[1])
            : $(args[1])(args[0])
}


export function $remove<A>(p: (a: A, i?: number|string) => boolean): (as: Associative) => Associative
export function $remove<A>(p: (a: A, i: number) => boolean, as: Array<A>): Array<A>
export function $remove<A>(p: (a: A) => boolean, as: Array<A>): Array<A>
export function $remove<A>(as: Array<A>, p: (a: A, i: number) => boolean): Array<A>
export function $remove<A>(as: Array<A>, p: (a: A) => boolean): Array<A>
export function $remove<A>(p: (a: A, i: number) => boolean, as: string): string
export function $remove<A>(p: (a: A) => boolean, as: string): string
export function $remove<A>(as: string, p: (a: A, i: number) => boolean): string
export function $remove<A>(as: string, p: (a: A) => boolean): string
export function $remove<A>(p: (a: A, i: string) => boolean, as: Map<A>): Map<A>
export function $remove<A>(p: (a: A) => boolean, as: Map<A>): Map<A>
export function $remove<A>(as: Map<A>, p: (a: A, i: string) => boolean): Map<A>
export function $remove<A>(as: Map<A>, p: (a: A) => boolean): Map<A>
export function $remove<A>(...args): any {

    const inner = p => $filter((a: any, i: number|string) => !p(a, i))

    return args.length === 1
        ? inner(args[0])
        : isFunction(args[0])
            ? inner(args[0])(args[1])
            : inner(args[1])(args[0]) as any
}


export function $separate<A>(p: (a: A, i?: number|string) => boolean): (as: Associative<A>) => Pair<Associative<A>>
export function $separate<A>(p: (a: A, i: number) => boolean, as: string): Pair<string>
export function $separate<A>(p: (a: A) => boolean, as: string): Pair<string>
export function $separate<A>(as: string, p: (a: A, i: number) => boolean): Pair<string>
export function $separate<A>(as: string, p: (a: A) => boolean): Pair<string>
export function $separate<A>(p: (a: A, i: number) => boolean, as: Array<A>): Pair<Array<A>>
export function $separate<A>(p: (a: A) => boolean, as: Array<A>): Pair<Array<A>>
export function $separate<A>(as: Array<A>, p: (a: A, i: number) => boolean): Pair<Array<A>>
export function $separate<A>(as: Array<A>, p: (a: A) => boolean): Pair<Array<A>>
export function $separate<A>(p: (a: A, i: string) => boolean, as: Map<A>): Pair<Map<A>>
export function $separate<A>(p: (a: A) => boolean, as: Map<A>): Pair<Map<A>>
export function $separate<A>(as: Map<A>, p: (a: A, i: string) => boolean): Pair<Map<A>>
export function $separate<A>(as: Map<A>, p: (a: A) => boolean): Pair<Map<A>>
export function $separate<A>(...args): any {

    const $ = p => (as: Array<A>|Map<A>): Pair<Array<A>, Array<A>>|Pair<Map<A>,Map<A>> =>
        [$filter(p)(as as any) as any, $remove(p)(as as any) as any]

    return args.length === 1
        ? $(args[0])
        : isFunction(args[0])
            ? $(args[0])(args[1])
            : $(args[1])(args[0])
}
