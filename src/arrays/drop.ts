import {isNot} from '../predicates';

/**
 * @author Daniel de Oliveira
 */


export const drop = <A>(n: number) =>
    (as: Array<A>) =>
        n < 1 ? as :
            as.slice(n);


export const dropRight = <A>(n: number) =>
    (as: Array<A>) =>
        n < 1 ? as :
            as.reverse().slice(n).reverse();


export const dropWhile = <A>(predicate: (_: A) => boolean) =>
    (as: Array<A>) => {
        let go = false;
        return as.reduce((acc: Array<A>, a) =>
            go || !predicate(a) ? (go = true, acc.concat([a])) : acc, []);
    };


export const dropRightWhile = <A>(predicate: (_: A) => boolean) =>
    (as: Array<A>) =>
        (dropWhile(predicate)(as.reverse())).reverse();