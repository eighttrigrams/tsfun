import {isNot} from './predicate';
import {ArrayList, Pair, Predicate, Transformation} from './types';
import {identical} from './core';


export const separate = <A>(p: Predicate<A>) =>
    (as: Array<A>): Pair<Array<A>> =>
        [as.filter(p), as.filter(isNot(p))];


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


export const filter = <A>(f: Predicate<A>): Transformation<Array<A>> =>
    (as: Array<A>) =>
        as.filter(f);


const intoArrayWith = <A>(f: (_: A) => Array<A>) => (acc: Array<A>, val: A) => acc.concat(f(val));


const intoArray = intoArrayWith(identical as any);




export const drop = <A>(n: number) =>
    (as: ArrayList<A>) =>
        n < 1 ? as :
            as.slice(n);


export const dropRight = <A>(n: number) =>
    (as: ArrayList<A>) =>
        n < 1 ? as :
            as.reverse().slice(n).reverse();


export const dropWhile = <A>(predicate: (_: A) => boolean) =>
    (as: ArrayList<A>) => {
        let go = false;
        return as.reduce((acc: Array<A>, a) =>
            go || !predicate(a) ? (go = true, acc.concat([a])) : acc, []);
    };


export const dropRightWhile = <A>(predicate: (_: A) => boolean) =>
    (as: ArrayList<A>) =>
        (dropWhile(predicate)(as.reverse())).reverse();


export const take = <A>(n: number) =>
    (as: ArrayList<A>) =>
        n < 0 ? [] :
            as.reduce((acc: ArrayList<A>, val, i) =>
                    i < n ? acc.concat([val]) : acc
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
export const getIth = <A>(as: Array<A>) => (i: number): A|undefined => getIthOr(as)(i);


// Written with Thomas Kleinke
export const getIthOr = <A>(as: Array<A>, defaultValue: A|undefined = undefined) => (i: number): A|undefined =>
    as.length < i ? defaultValue : as[i];


