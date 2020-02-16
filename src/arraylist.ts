import {ArrayList, Pair, Predicate, SimpleTransformation} from './type';
import {isArray, isNot} from './predicate';
import {copy} from './associative';


// ------------ @author Daniel de Oliveira -----------------


export const apply = <T>(f: (_: T, __: T) => T) =>
    (...coll: ArrayList<T>) => coll.reduce(f);


export const separate = <A>(p: Predicate<A>) =>
    (as: Array<A>): Pair<Array<A>, Array<A>> =>
        [as.filter(p), as.filter(isNot(p))];


export const reverse = <A>(as: ArrayList<A>): ArrayList<A> =>
    as.reduce((acc: Array<A>, a) => [a].concat(acc), []);


export const append = <A>(...as2: ArrayList<A>) => (as: ArrayList<A>) =>
    as.concat(as2);


export const prepend = <A>(...as2: ArrayList<A>) => (as: ArrayList<A>) =>
    as2.concat(as);


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



export function flatten<T>(as: Array<Array<T>>): Array<T>;
export function flatten<T,R>(depth: number): (as: Array<T>) => Array<R>;
export function flatten<T,R>(asOrDepth: Array<Array<T>>|number): Array<Array<T>>|((_:Array<T>) => Array<R>) {

    const reducer = reduce((acc: any, val: any) => acc.concat(val), [] as any); // TODO rename or review and check duplication with flatMap

    return isArray(asOrDepth)
        ? reducer(asOrDepth as Array<Array<T>>)
        : (as: Array<T>) =>
            asOrDepth === 1
                ? reducer(as)
                : flatten((asOrDepth as number) - 1)(reducer(as));
}


export const indices = <A>(f: Predicate<A>) =>
    (as: Array<A>): number[] =>
        as.reduce((indices: number[], a: A, i: number) =>
                f(a)
                    ? indices.concat([i])
                    : indices
        , []);


export const forEachRight = <A>(
    f: ((_: A, i: number) => void)|((_: A) => void)) =>
    (as: Array<A>) => {
        let i = as.length - 1;
        for (let item of reverse(as)) {
            (f as any)(item, i);
            i--;
        }
        return as;
    };


const intoArrayWith = <A>(f: (_: A) => Array<A>) =>
    (acc: Array<A>, val: A) => acc.concat(f(val));


export const drop = (n: number) =>
    <A>(as: ArrayList<A>) =>
        n < 1 ? as :
            as.slice(n);


export const dropRight = (n: number) =>
    <A>(as: ArrayList<A>): ArrayList<A> =>
        as.slice(0, Math.max(0, as.length-n)) as ArrayList<A>;


export const dropWhile = <A>(predicate: Predicate<A>) =>
    (as: ArrayList<A>) => {
        let go = false;
        return as.reduce((acc: Array<A>, a) =>
            go || !predicate(a) ? (go = true, acc.concat([a])) : acc, []);
    };


export const dropRightWhile = <A>(predicate: Predicate<A>) =>
    (as: ArrayList<A>) => {
        let go = false;
        return as.reduceRight((acc: Array<A>, a) =>
            go || !predicate(a) ? (go = true, [a].concat(acc)) : acc, []);
    };


export const take = (n: number) =>
    <A>(as: ArrayList<A>) =>
        n < 0 ? [] :
            as.reduce((acc: ArrayList<A>, val, i) =>
                    i < n ? acc.concat([val]) : acc
                , []);


export const takeRight = (n: number) =>
    <A>(as: ArrayList<A>) =>
        n < 0 ? [] :
            as.reduceRight((acc: ArrayList<A>, val, i) =>
                (as.length - i) <= n ? [val].concat(acc) : acc
                , []);


export const takeNth = (n: number) =>
    <A>(as: ArrayList<A>) =>
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


export function sort<A>(f: (a: A, b: A) => number) {

    return (as: Array<A>): Array<A> => copy(as).sort(f as any);
}


export function first<T>(as: Array<T>): T|undefined {

    return as.length === 0
        ? undefined
        : as[0];
}


export function last<T>(as: Array<T>): T|undefined {

    return as.length === 0
        ? undefined
        : as[as.length-1];
}
