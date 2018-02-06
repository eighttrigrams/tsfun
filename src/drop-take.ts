import {isNot} from './predicates';

/**
 * @author Daniel de Oliveira
 */


export const take = <A>(n: number) =>
    (as: Array<A>) =>
        n < 0 ? [] :
            as.reduce((acc: Array<A>, val, i) =>
                i < n ? acc.concat([val]) : acc
                , []);


export const drop = <A>(n: number) =>
    (as: Array<A>) =>
        n < 1 ? as :
            as.slice(n);


export const dropRight = <A>(n: number) =>
    (as: Array<A>) =>
        n < 1 ? as :
            as.reverse().slice(n).reverse();


export const takeWhile = <A>(predicate: (_: A) => boolean) =>
    (as: Array<A>) => {
        let go = true;
        return as.reduce((acc: Array<A>, a) =>
            go && predicate(a) ? acc.concat([a]) : (go = false, acc), []);
    };


export const takeRightWhile = <A>(predicate: (_: A) => boolean) =>
    (as: Array<A>) => {
        let go = true;
        return as.reduceRight((acc: Array<A>, a) =>
            go && predicate(a) ? [a].concat(acc) : (go = false, acc), []);
    };


export const takeUntil = <A>(predicate: (_: A) => boolean) =>
    (as: Array<A>) => {
        const found = as.find(predicate);
        return found ?
            takeWhile(isNot(predicate))(as).concat([found])
            : as
    };


export const dropWhile = <A>(predicate: (_: A) => boolean) =>
    (as: Array<A>) => {
        let go = false;
        return as.reduce((acc: Array<A>, a) =>
            go || !predicate(a) ? (go = true, acc.concat([a])) : acc, []);
    };


export const dropRightWhile = <A>(predicate: (_: A) => boolean) =>
    (as: Array<A>) =>
        (dropWhile(predicate)(as.reverse())).reverse();