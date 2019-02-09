import {isNot} from './predicate';
import {ArrayList, AsyncPredicate, Pair, Predicate, Transformation, UntypedObjectCollection} from './type';
import {identical} from './core';
import {subtract} from "./arrayset";
import {subtractObject} from "./objectset";



// ------------ @author Daniel de Oliveira -----------------


export const apply = <T>(f: (_: T, __: T) => T) =>
    (...coll: ArrayList<T>) => coll.reduce(f);


export const separate = <A>(p: Predicate<A>) =>
    (as: Array<A>): Pair<Array<A>> =>
        [as.filter(p), as.filter(isNot(p))];


export const copy = <T>(as: ArrayList<T>): ArrayList<T> =>
        subtract([])(as as any) as ArrayList<T>;


export const reverse = <A>(as: ArrayList<A>): ArrayList<A> =>
    as.reverse();


export const append = <A>(as2: ArrayList<A>) => (as: ArrayList<A>) =>
    as.concat(as2);


export const prepend = <A>(as2: ArrayList<A>) => (as: ArrayList<A>) =>
    as2.concat(as);


export const flatMap = <A>(f: (_: A) => ArrayList<A>): Transformation<ArrayList<A>> =>
    (as: Array<A>) =>
        as.length < 1
            ? []
            : as.reduce(intoArrayWith(f),[]);


export const map = <A>(f: (_: A) => A): Transformation<Array<A>> =>
    (as: Array<A>): Array<A> => as.map(f);


export const asyncMap = <A>(f: (_: A) => Promise<A>) =>
    async (as: Array<A>): Promise<Array<A>> => {

        const newAs: Array<A> = [];
        for (let a of as) newAs.push(await f(a) as never);
        return newAs;
    };


export const filter = <A>(f: Predicate<A>): Transformation<Array<A>> =>
    (as: Array<A>) =>
        as.filter(f);


export const remove = <A>(f: Predicate<A>): Transformation<Array<A>> => filter(isNot(f));


export const asyncFilter = <A>(f: AsyncPredicate<A>) =>
    async (as: Array<A>) => {
        const newAs: Array<A> = [];
        for (let a of as) if (await f(a)) newAs.push(a as never);
        return newAs;
    };


export const forEach = <A>(
    f: ((_: A, i: number) => void)|((_: A) => void)) =>
    (as: Array<A>) => {
        let i = 0;
        for (let item of as) {
            (f as any)(item, i);
            i++;
        }
        return as;
    };


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


/* experimental */ export const intoArrayWith = <A>(f: (_: A) => Array<A>) =>
    (acc: Array<A>, val: A) => acc.concat(f(val));


/* experimental */ export const intoArray = intoArrayWith(identical as any);


export const drop = <A>(n: number) =>
    (as: ArrayList<A>) =>
        n < 1 ? as :
            as.slice(n);


export const dropRight = <A>(n: number) =>
    (as: ArrayList<A>) =>
        n < 1 ? as :
            as.reverse().slice(n).reverse();


export const dropWhile = <A>(predicate: Predicate<A>) =>
    (as: ArrayList<A>) => {
        let go = false;
        return as.reduce((acc: Array<A>, a) =>
            go || !predicate(a) ? (go = true, acc.concat([a])) : acc, []);
    };


export const dropRightWhile = <A>(predicate: Predicate<A>) =>
    (as: ArrayList<A>) =>
        (dropWhile(predicate)(as.reverse())).reverse();


export const take = <A>(n: number) =>
    (as: ArrayList<A>) =>
        n < 0 ? [] :
            as.reduce((acc: ArrayList<A>, val, i) =>
                    i < n ? acc.concat([val]) : acc
                , []);


export const takeRight = <A>(n: number) =>
    (as: ArrayList<A>) =>
        n < 0 ? [] :
            as.reduceRight((acc: ArrayList<A>, val, i) =>
                (as.length - i) <= n ? [val].concat(acc) : acc
                , []);


export const takeNth = <A>(n: number) =>
    (as: ArrayList<A>) =>
        n < 0 ? [] :
            as.reduce((acc: ArrayList<A>, val, i) =>
                    i % n === 0 ? acc.concat([val]) : acc
                , []);


export const takeWhile = <A>(predicate: Predicate<A>) =>
    (as: ArrayList<A>) => {
        let go = true;
        return as.reduce((acc: ArrayList<A>, a) =>
            go && predicate(a) ? acc.concat([a]) : (go = false, acc), []);
    };


export const takeRightWhile = <A>(predicate: Predicate<A>) =>
    (as: ArrayList<A>) => {
        let go = true;
        return as.reduceRight((acc: Array<A>, a) =>
            go && predicate(a) ? [a].concat(acc) : (go = false, acc), []);
    };


export const takeUntil = <A>(predicate: Predicate<A>) =>
    (as: ArrayList<A>) =>
        (found => found ?
                takeWhile(isNot(predicate))(as).concat([found])
                : as
        )(as.find(predicate));


