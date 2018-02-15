import {uncurry2} from './core';
import {includedIn, isNot} from "./predicates";


export type NestedArray<A> = Array<Array<A>>;


export const intersection = <A>(aas: NestedArray<A>): Array<A> =>
    aas.length < 1 ? [] :
        aas.reduce(uncurry2<A>(_intersect));


export const union = <A>(aas: NestedArray<A>): Array<A> =>
    aas.length < 1 ? [] :
        aas.reduce((acc, val) => val ? _unite(acc)(val) : acc);


export const intersect = <A>(...aas: NestedArray<A>) =>
    (as: Array<A>) => intersection<A>(aas.concat([as]));


/**
 * Generate a new list with elements which are contained in as but not in subtrahend
 */
export const subtract = <A>(...subtrahends: NestedArray<A>) =>
    (as: Array<A>): Array<A> =>
        ((unique<A>()(as)).filter(isNot(includedIn(union(subtrahends)))));


export const unite = <A>(...aas: NestedArray<A>) =>
    (as: Array<A>) => union(aas.concat([as]));


export const unique = <A>() => (as: Array<A>) =>
    as.reduce((acc: Array<A>, val) =>
             acc.includes(val) ? acc : acc.concat([val])
        ,[]);


/**
 * @returns the union of a1 and a2
 */
const _unite = <A>(as1: Array<A>) =>
    (as2: Array<A>) =>
        as1.concat(
            as2.filter(isNot(includedIn(as1))));


const _intersect = <A>(as1: Array<A>) =>
    (as2: Array<A>) => as1.filter(includedIn(as2));