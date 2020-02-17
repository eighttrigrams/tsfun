import {AsyncPredicate} from './type';


export const asyncForEach = <A>(
    f: ((_: A, i: number) => Promise<void>)|((_: A) => Promise<void>)) =>
    async (as: Array<A>) => {

        let i = 0;
        for (let item of as) {
            await (f as any)(item, i);
            i++;
        }
        return as;
    };


export const asyncFilter = <A>(f: AsyncPredicate<A>) =>
    async (as: Array<A>) => {
        const newAs: Array<A> = [];
        for (let a of as) if (await f(a)) newAs.push(a as never);
        return newAs;
    };


export const asyncReduce = <A, B>(f: (b: B, a: A) => Promise<B>, init: B) =>
    async (as: Array<A>): Promise<B> => {

        let acc = init;
        for (let a of as) {
            acc = await f(acc, a);
        }
        return acc;
    };


export const asyncMap = <A, B>(f: (_: A) => Promise<B>) =>
    async (as: Array<A>): Promise<Array<B>> => {

        const bs: Array<B> = [];
        for (let a of as) bs.push(await f(a));
        return bs;
    };


export async function asyncFlow(a: any, ...b: any[]) {

    let currentA = a;
    for (let currentB of b) currentA = await currentB(currentA);
    return currentA;
}