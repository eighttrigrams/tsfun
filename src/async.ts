import {AsyncPredicate, ObjectCollection} from './type';
import {isArray, isObject} from './predicate';
import {keys} from './associative';


export const forEach = <A>(
    f: ((_: A, i: number) => Promise<void>)|((_: A) => Promise<void>)) =>
    async (as: Array<A>) => {

        let i = 0;
        for (let item of as) {
            await (f as any)(item, i);
            i++;
        }
        return as;
    };


export const filter = <A>(f: AsyncPredicate<A>) =>
    async (as: Array<A>) => {
        const newAs: Array<A> = [];
        for (let a of as) if (await f(a)) newAs.push(a as never);
        return newAs;
    };


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


export const map = <A, B>(f: (_: A) => Promise<B>) =>
    async (as: Array<A>): Promise<Array<B>> => {

        const bs: Array<B> = [];
        for (let a of as) bs.push(await f(a));
        return bs;
    };


export async function flow(a: any, ...b: any[]) {

    let currentA = a;
    for (let currentB of b) currentA = await currentB(currentA);
    return currentA;
}