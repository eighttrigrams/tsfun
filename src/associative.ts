import {
    Predicate, Map
} from './type';
import {zip} from "./list";
import {isArray, isObject} from './predicate';
import {copy} from './collection';
import {range} from './array';


// Written with Thomas Kleinke
export function get<A>(i: number, defaultValue?: A|undefined): (as: Array<A>) => A|undefined;
export function get<T>(i: string, defaultValue?: T|undefined): (as: Map<T>) => T|undefined;
export function get<T>(i: number|string, alternative?: T|undefined) {

    return (as: Array<T>|Map<T>): T|undefined => {

        const result = (as as any)[i];
        return result !== undefined ? result : alternative;
    };
}


export function dissoc<T>(key: string): (struct: Map<T>) => Map<T>;
export function dissoc<A>(key: number): (struct: Array<A>) => Array<A>;
export function dissoc<T>(key: string|number) {

    return (struct: Map<T>|Array<T>) => {

        const newStruct = copy(struct as any);
        if (isArray(struct)) (newStruct as any).splice(key, 1);
        else delete (newStruct as any)[key];
        return newStruct;
    }
}


export function update<T>(key: string, f: (_: T) => T): (struct: Map<T>) => Map<T>;
export function update<A>(key: number, f: (_: A) => A): (struct: Array<A>) => Array<A>;
export function update<T>(key: string|number, f: (_: T) => T) {

    return (struct: Map<T>|Array<T>) => {

        const newStruct = copy(struct as any);
        (newStruct as any)[key] = f((newStruct as any)[key]);
        return newStruct;
    }
}


export function assoc<T>(key: string, value: T): (struct: Map<T>) => Map<T>;
export function assoc<A>(key: number, value: A): (struct: Array<A>) => Array<A>;
export function assoc<T>(key: string|number, value: T) {

    return (struct: Map<T>|Array<T>) => {

        const newStruct = copy(struct as any);
        (newStruct as any)[key] = value;
        return newStruct;
    }
}


export function lookup<T>(struct: Map<T>, alternative?: T): (targetId: string) => T|undefined;
export function lookup<A>(struct: Array<A>, alternative?: A): (targetId: number) => A|undefined;
export function lookup<A>(struct: Map<A>|Array<A>, alternative?: any) {

    return (targetId: string|number): A|undefined => {

        const result = (struct as any)[targetId];
        return result !== undefined ? result : alternative;
    }
}


export function keysAndValues<A>(as: Array<A>): Array<[number, A]>;
export function keysAndValues<T>(o: Map<T>): Array<[string, T]>;
export function keysAndValues<T>(o: Map<T>|Array<T>): Array<[string|number, T]> {

    return zip(keys(o))(Object.values(o)) as Array<[string, T]>;
}


export function keys<T>(as: Array<T>): number[];
export function keys(o: Map<any>): string[];
export function keys<T>(t: Array<T>|Map<any>): number[]|string[] {

    return isArray(t)
        ? range(t.length)
        : Object.keys(t);
}


export function values<A>(as: Array<A>): Array<A>;
export function values<T>(o: Map<T>): Array<T>;
export function values<T>(t: Map<T>|Array<T>): Array<T> {

    return isArray(t)
        ? t as Array<T>
        : Object.values(t);
}


/* internal */ export const mapProperties = <A, B>(f: (_: A) => B) =>
    (keys: Array<number|string>, o: Map<A>): Map<B> =>
        keys.reduce(mapPropertiesReducer(f)(o), {});


const mapPropertiesReducer = <A, B>(f: (_: A) => B) =>
    (o: any) => (acc: any, val: string) => (acc[val] = f(o[val]), acc);


const filterObj = <T>(predicate: Predicate<T>): (_: Map<T>) => Map<T> =>
    (o: Map<T>) =>
        Object
            .keys(o)
            .reduce((acc: Map<T>, key: string|number) => {
                if (predicate(o[key])) acc[key] = o[key];
                return acc;
            }, {});


export function map<A = any, B = A>(f: (_: A, i?: string|number) => B): {
    (as: Array<A>): Array<B>
    (os: Map<A>): Map<B>
}
export function map<A, B>(f: (_: A, i?: string|number) => B) {

    return (as: any) => {

        if (isArray(as)) return (as as Array<A>).map(f) as Array<B>;
        else {
            const result: Map<B> = {};
            for (let key of Object.keys(as)) result[key] = f(as[key], key);
            return result;
        }
    }
}


export function forEach<A>(f: (_: A, i?: number|string) => void): {
    (as: Array<A>): Array<A>
    (os: Map<A>): Map<A>
}
export function forEach<A>(f: (_: A, i?: number|string) => void) {

    return (as: Array<A>|Map<A>) => {

        if (isArray(as)) {

            let i = 0;
            for (let item of as) {
                (f as any)(item, i);
                i++;
            }
            return as as Array<A>;

        } else if (isObject(as)) {

            for (let item of keysAndValues(as as any)) {
                (f as any)(item[1], item[0]);
            }
            return as as Map<A>;
        } else {

            throw 'illegal argument - must be array or object';
        }
    };
}


export function reduce<A, B>(f: (b: B, a: A, i?: number|string) => B, init: B): {
    (as: Array<A>): B
    (os: Map<A>): B
}
export function reduce<T, B>(f: (b: B, t: T, i?: number|string) => B, init: B) {

    return (ts: Array<T>|Map<T>): B => {

        if (isArray(ts)) {

            let acc = init;
            let i = 0;
            for (let a of ts) {
                acc = f(acc, a, i);
                i++;
            }
            return acc;

        } else if (isObject(ts)) {

            const o = ts as Map<T>;

            let acc = init;
            for (let k of keys(ts)) {
                acc = f(acc, o[k], k);
            }
            return acc;

        } else {

            throw "illegal argument - must be array or object"
        }
    };
}

