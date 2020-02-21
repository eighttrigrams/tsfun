import {AsyncPredicate, ObjectCollection} from './type';
import {isArray, isObject} from './predicate';
import {keys, keysAndValues} from './associative';


export function forEach<A>(f: (_: A, i?: number|string) => Promise<void>): {
    (as: Array<A>): Promise<Array<A>>
    (os: ObjectCollection<A>): Promise<ObjectCollection<A>>
}
export function forEach<A>(f: (_: A, i?: number|string) => Promise<void>) {

    return async (as: Array<A>|ObjectCollection<A>) => {

        if (isArray(as)) {

            let i = 0;
            for (let item of as) {
                await (f as any)(item, i);
                i++;
            }
            return as as Array<A>;

        } else if (isObject(as)) {

            for (let item of keysAndValues(as as any)) {
                await (f as any)(item[1], item[0]);
            }
            return as as ObjectCollection<A>;

        }
    };
}


export function filter<T>(f: AsyncPredicate<T>): {
    (as: Array<T>): Promise<Array<T>>
    (os: ObjectCollection<T>): ObjectCollection<T>
}
export function filter<T>(f: AsyncPredicate<T>) {

    return async (as: Array<T>|ObjectCollection<T>) => {

        if (isArray(as)) {

            const as1: Array<T> = [];
            for (let a of as) {
                if (await f(a)) as1.push(a);
            }
            return as1;

        } else if (isObject(as)) {

            const o = as as ObjectCollection<T>;
            const o1: ObjectCollection<T> = {};
            for (let k of keys(o)) {
                if (await f(o[k])) o1[k] = o[k];
            }
            return o1;

        } else {
            throw 'illegal argument - must be array or object'
        }
    }
}


export function reduce<A, B>(f: (b: B, a: A, i?: number|string) => Promise<B>, init: B): {
    (as: Array<A>): Promise<B>
    (os: ObjectCollection<A>): Promise<B>
}
export function reduce<T, B>(f: (b: B, t: T, i?: number|string) => Promise<B>, init: B) {

    return async (ts: Array<T>|ObjectCollection<T>): Promise<B> => {

        if (isArray(ts)) {

            let acc = init;
            let i = 0;
            for (let a of ts) {
                acc = await f(acc, a, i);
                i++;
            }
            return acc;

        } else if (isObject(ts)) {

            const o = ts as ObjectCollection<T>;

            let acc = init;
            for (let k of keys(ts)) {
                acc = await f(acc, o[k], k);
            }
            return acc;

        } else {

            throw "illegal argument - must be array or object"
        }
    };
}



export function map<A, B>(f: (_: A, i?: string|number) => Promise<B>): {
    (as: Array<A>): Promise<Array<B>>
    (os: ObjectCollection<A>): Promise<ObjectCollection<B>>
}
export function map<A, B>(f: (_: A, i?: string|number) => B) {

    return async (as: any) => {

        if (isArray(as)) {

            const bs: Array<B> = [];
            for (let a of as) bs.push(await f(a));
            return bs;

        } else if (isObject(as)) {

            const result: ObjectCollection<B> = {};
            for (let key of Object.keys(as)) result[key] = await f(as[key], key);
            return result;

        } else {

            throw 'illegal argument - must be array or object'
        }
    }
}


export async function flow(a: any, ...b: any[]) {

    let currentA = a;
    for (let currentB of b) currentA = await currentB(currentA);
    return currentA;
}