import {uncurry2} from '../core';
import {Comparator, includedInBy, sameAs} from "../comparators";
import {isNot} from '../predicates';


/**
 * @author Daniel de Oliveira
 */

export type NestedArray<A> = Array<Array<A>>;


export const intersectionBy =
    (compare: Comparator = sameAs) =>
        <A>(aas: NestedArray<A>): Array<A> =>
            aas.length < 1 ? [] :
                aas.reduce(uncurry2<A>(_intersectBy(compare)));


export const intersection = intersectionBy();


export const unionBy =
    (compare: Comparator = sameAs) =>
        <A>(aas: NestedArray<A>): Array<A> =>
        aas.length < 1 ? [] :
            aas.reduce((acc, val) => val ? _uniteBy(compare)(acc)(val) : acc);


export const union = unionBy();


export const intersectBy =
    (compare: Comparator = sameAs) =>
        <A>(...aas: NestedArray<A>) =>
            (as: Array<A>) => intersectionBy(compare)<A>(aas.concat([as]));


export const intersect = intersectBy();


export const uniteBy = (compare: Comparator = sameAs) => <A>(...aas: NestedArray<A>) =>
    (as: Array<A>) => unionBy(compare)(aas.concat([as]));


export const unite = uniteBy();


/**
 * Generate a new list with elements which are contained in as but not in subtrahend
 */
export const subtractBy =
    (compare: Comparator = sameAs) =>
        <A>(...subtrahends: NestedArray<A>) =>
            (as: Array<A>): Array<A> =>
                ((unique<A>(as)).filter(isNot(includedInBy(compare)(union(subtrahends)))));


/**
 * Generate a new list with elements which are contained in as but not in subtrahend
 */
export const subtract = subtractBy();


export const uniqueBy = (compare: Comparator = sameAs) =>
    <A>(as: Array<A>) =>
        as.reduce((acc: Array<A>, val) =>
            includedInBy(compare)(acc)(val)
                ? acc : acc.concat([val])
        ,[]);


export const unique = uniqueBy();


/**
 * @returns the union of a1 and a2
 */
const _uniteBy = (compare: Comparator = sameAs) => <A>(as1: Array<A>) =>
    (as2: Array<A>) =>
        as1.concat(
            as2.filter(isNot(includedInBy(compare)(as1))));


const _intersectBy = (compare: Comparator = sameAs) => <A>(as1: Array<A>) =>
    (as2: Array<A>) => as1.filter(includedInBy(compare)(as2));


/**
 * @author Thomas Kleinke
 * @author Daniel de Oliveira
 */
export function equals<A>(as1: A[], as2: A[], // TODO make it also work for objects
                       compare: Comparator = sameAs): boolean {

    if (as1.length !== as2.length) return false;

    for (let element of as1) { // TODO use HOF
        if (!includedInBy(compare)(as2)(element)) return false;
    }

    for (let element of as2) {
        if (!includedInBy(compare)(as1)(element)) return false;
    }

    return true;
}