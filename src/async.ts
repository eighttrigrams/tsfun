import {ObjectCollection, Pair} from './type';
import {isArray, isObject, isString} from './predicate';
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


export function filter<T>(p: (a: T, i?: string|number) => Promise<boolean>): {
    (as: Array<T>): Promise<Array<T>>
    (os: ObjectCollection<T>): Promise<ObjectCollection<T>>
    (s: string): Promise<string>
}
export function filter<T>(p: (t: T, i?: string|number) => Promise<boolean>) {

    return async (as: Array<T>|ObjectCollection<T>|string) => {

        if (isArray(as)) {

            const as1 = [];
            let i = 0;
            for (let a of as) {
                if (await p(a as any, i)) as1.push(a);
                i++;
            }

            return as1 as Array<T>

        } else if (isObject(as)) {

            const o = as as ObjectCollection<T>;

            const o1: any = {};
            let i = 0;
            for (let k of keys(o)) {
                if (await p(o[k], k)) o1[k] = o[k];
                i++;
            }

            return o1 as ObjectCollection<T>;

        } else if (isString(as)) {

            const s = (as as any).split('');

            const s1: any = [];
            let i = 0;
            for (let k of keys(s)) {
                if (await p(s[k], k)) s1[k] = s[k];
                i++;
            }

            return (s1.join('')) as string;

        } else {

            throw 'illegal argument - must be array or object'
        }
    }
}



export function separate<T>(p: (a: T, i?: string|number) => Promise<boolean>): {
    (as: Array<T>): Promise<Pair<Array<T>, Array<T>>>
    (os: ObjectCollection<T>): Promise<Pair<ObjectCollection<T>, ObjectCollection<T>>>
    (s: string): Promise<Pair<string, string>>
}
export function separate<T>(p: (t: T, i?: string|number) => Promise<boolean>) {

    return async (as: Array<T>|ObjectCollection<T>|string) => {

        if (isArray(as)) {

            return [
                await filter(p)(as as Array<T>),
                await remove(p)(as as Array<T>)
            ] as Pair<Array<T>, Array<T>>;

        } else if (isObject(as)) {

            return [
                await filter(p)(as as ObjectCollection<T>),
                await remove(p)(as as ObjectCollection<T>)
            ] as Pair<ObjectCollection<T>, ObjectCollection<T>>;

        } else if (isString(as)) {

            return [
                await filter(p)(as as any),
                await remove(p)(as as any)
            ] as unknown as Pair<string, string>;

        } else {

            throw 'illegal argument - must be array or object'
        }
    }
}


export function remove<A>(p: (a: A, i?: string|number) => Promise<boolean>): {
    (as: Array<A>): Promise<Array<A>>
    (os: ObjectCollection<A>): Promise<ObjectCollection<A>>
    (s: string): Promise<string>
}
export function remove<A>(p: (a: A, i?: string|number) => Promise<boolean>) {

    return filter(async (a: any, i?: string|number) => !(await p(a, i)));
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