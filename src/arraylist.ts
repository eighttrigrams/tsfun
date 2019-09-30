import {isNot} from 'tsfun-core';
import {ArrayList, Pair, Predicate, SimpleTransformation} from './type';
import {identical} from './core';
import {subtract} from "tsfun-core";


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


export const map = <A, B>(f: (_: A) => B) =>
    (as: Array<A>): Array<B> => as.map(f);


export const reduce = <A, B>(f: (b: B, a: A, i?: number) => B, init: B) =>
    (as: Array<A>): B => {

        let acc = init;
        let i = 0;
        for (let a of as) {
            acc = f(acc, a, i);
            i++;
        }
        return acc;
    };


export const flatMap = <A>(f: (_: A) => ArrayList<A>): SimpleTransformation<ArrayList<A>> =>
    (as: Array<A>) =>
        as.length < 1
            ? []
            : as.reduce(intoArrayWith(f),[]);


export const flatten = reduce((acc: any, val: any) => acc.concat(val), [] as any);


export const indices = <A>(f: Predicate<A>) =>
    (as: Array<A>): number[] =>
        as.reduce((indices: number[], a: A, i: number) =>
                f(a)
                    ? indices.concat([i])
                    : indices
        , []);


export const filter = <A>(f: Predicate<A>): SimpleTransformation<Array<A>> =>
    (as: Array<A>) =>
        as.filter(f);


export const remove = <A>(f: Predicate<A>): SimpleTransformation<Array<A>> => filter(isNot(f));


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


export const forEachRight = <A>(
    f: ((_: A, i: number) => void)|((_: A) => void)) =>
    (as: Array<A>) => {
        let i = as.length - 1;
        for (let item of as.reverse()) {
            (f as any)(item, i);
            i--;
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


// Written with Thomas Kleinke
export const nth =
    <A>(i: number) =>
        (as: ArrayList<A>): A => {
            const result = nthOr(i, undefined as unknown as A)(as as any);
            if (result === undefined) throw Error('nth, got nothing');
            return result;
        };


// Written with Thomas Kleinke
export const nthOr =
    <A>(i: number, defaultValue?: A) =>
        (as: ArrayList<A>): A|undefined =>
            as.length < i ? defaultValue : as[i];


/**
 * see https://mail.mozilla.org/pipermail/es-discuss/2012-April/022273.html
 */
export function arrayList(size: number) {

    return Array.apply(null, Array(size))
}


export function zip<A,B> (as: ArrayList<A>) {

    return (bs: ArrayList<B>) => {

        const minimumLength = Math.min(as.length, bs.length);
        const _as = take(minimumLength)(as);
        const _bs = take(minimumLength)(bs);

        const zipped: ArrayList<[A, B]> = [];
        for (let i = 0; i < minimumLength; i++) {
            zipped.push([_as[i] as A, _bs[i] as B]);
        }
        return zipped;
    }
}


export function zipWith<A,B,C> (f: (a: A, b: B) => C, as: ArrayList<A>) {

    return (bs: ArrayList<B>) => {

        const minimumLength = Math.min(as.length, bs.length);
        const _as = take(minimumLength)(as);
        const _bs = take(minimumLength)(bs);

        const zipped: ArrayList<C> = [];
        for (let i = 0; i < minimumLength; i++) {
            zipped.push(f((_as as any)[i] as A, (_bs as any)[i] as B));
        }
        return zipped;
    }
}


export function range(a: number, b?: number, stepSize: number = 1): number[] {

    let begin: number|undefined = undefined;
    let end:   number|undefined = undefined;

    if (b === undefined) {
        end = a;
        begin = 0;
    } else {
        begin = a;
        end   = b;
    }
    const numItems = (end - begin) / stepSize;

    return arrayList(numItems)
        .map((a: any, i: number) => (begin as number) + (i * stepSize));
}


export function count<T>(p: Predicate<T>) {

    return (as: Array<T>) => as.filter(p).length;
}