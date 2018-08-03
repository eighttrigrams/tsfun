import {uncurry2} from '../core';
import {ComparisonFunction, includedIn, isNot, sameAs} from "../predicates";


/**
 * @author Daniel de Oliveira
 */

export type NestedArray<A> = Array<Array<A>>;


export const intersectionBy =
    (compare: ComparisonFunction = sameAs) =>
        <A>(aas: NestedArray<A>): Array<A> =>
            aas.length < 1 ? [] :
                aas.reduce(uncurry2<A>(_intersect(compare)));


export const intersection = intersectionBy();


export const unionBy =
    (compare: ComparisonFunction = sameAs) =>
        <A>(aas: NestedArray<A>): Array<A> =>
        aas.length < 1 ? [] :
            aas.reduce((acc, val) => val ? _unite(compare)(acc)(val) : acc);


export const union = unionBy();


export const intersectBy =
    (compare: ComparisonFunction = sameAs) =>
        <A>(...aas: NestedArray<A>) =>
            (as: Array<A>) => intersectionBy(compare)<A>(aas.concat([as]));


export const intersect = intersectBy();


export const uniteBy = (compare: ComparisonFunction = sameAs) => <A>(...aas: NestedArray<A>) =>
    (as: Array<A>) => unionBy(compare)(aas.concat([as]));


export const unite = uniteBy();


/**
 * Generate a new list with elements which are contained in as but not in subtrahend
 */
export const subtractBy =
    (compare: ComparisonFunction = sameAs) =>
        <A>(...subtrahends: NestedArray<A>) =>
            (as: Array<A>): Array<A> =>
                ((unique<A>(as)).filter(isNot(includedIn(union(subtrahends), compare))));


/**
 * Generate a new list with elements which are contained in as but not in subtrahend
 */
export const subtract = subtractBy();


export const uniqueBy = (compare: ComparisonFunction = sameAs) =>
    <A>(as: Array<A>) =>
        as.reduce((acc: Array<A>, val) =>
            includedIn(acc, compare)(val)
                ? acc : acc.concat([val])
        ,[]);


export const unique = uniqueBy();


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
export function equals<A>(as1: A[], as2: A[], // TODO make it also work for objects
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