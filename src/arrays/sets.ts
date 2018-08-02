import {uncurry2} from '../core';
import {ComparisonFunction, includedIn, isNot, sameAs} from "../predicates";


/**
 * @author Daniel de Oliveira
 */

export type NestedArray<A> = Array<Array<A>>;


export const intersection = <A>(aas: NestedArray<A>, compare: ComparisonFunction = sameAs): Array<A> =>
    aas.length < 1 ? [] :
        aas.reduce(uncurry2<A>(_intersect(compare)));


export const union = <A>(aas: NestedArray<A>, compare: ComparisonFunction = sameAs): Array<A> =>
    aas.length < 1 ? [] :
        aas.reduce((acc, val) => val ? _unite(compare)(acc)(val) : acc);


export const intersect = <A>(as: Array<A>, compare: ComparisonFunction = sameAs) =>
    (as2: Array<A>) => intersection<A>([as, as2], compare);


/**
 * Generate a new list with elements which are contained in as but not in subtrahend
 */
export const subtract = <A>(subtrahend: Array<A>, compare: ComparisonFunction = sameAs) =>
    (as: Array<A>): Array<A> =>
        ((unique<A>(as)).filter(isNot(includedIn(subtrahend, compare))));


export const unite = <A>(as1: Array<A>, compare: ComparisonFunction = sameAs) =>
    (as2: Array<A>) => union([as1, as2], compare);


export const unique = <A>(as: Array<A>) =>
    as.reduce((acc: Array<A>, val) =>
             acc.includes(val) ? acc : acc.concat([val])
        ,[]);


/**
 * @returns the union of a1 and a2
 */
const _unite = (compare: ComparisonFunction = sameAs) => <A>(as1: Array<A>) =>
    (as2: Array<A>) =>
        as1.concat(
            as2.filter(isNot(includedIn(as1, compare))));


const _intersect = (compare: ComparisonFunction = sameAs) => <A>(as1: Array<A>) =>
    (as2: Array<A>) => as1.filter(includedIn(as2, compare));


/**
 * @author Thomas Kleinke
 * @author Daniel de Oliveira
 */
export function equals<A>(as1: A[], as2: A[],
                       compare: ComparisonFunction = sameAs): boolean {

    if (as1.length !== as2.length) return false;

    for (let element of as1) { // TODO use HOF
        if (!includedIn(as2, compare)(element)) return false;
    }

    for (let element of as2) {
        if (!includedIn(as1, compare)(element)) return false;
    }

    return true;
}