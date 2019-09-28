import {ArrayList, ArraySet, Comparator} from './type';
import {isNot} from 'tsfun-core';
import {includedInBy, uniqueBy, intersectionBy, unionBy,
    intersectBy, uniteBy, subtractBy} from 'tsfun-core'

// ------------ @author Daniel de Oliveira -----------------

export const intersection = intersectionBy();

export const union = unionBy();

export const intersect = intersectBy();

export const unite = uniteBy();

// Generate a new list with elements which are contained in as but not in subtrahend
export const subtract = subtractBy();

export const unique = uniqueBy();


// Contributed by Thomas Kleinke
export function duplicates<A>(array: ArrayList<A>): ArraySet<A> {

    const temp: any[] = [];
    const result: any[] = [];

    for (let value of array) {
        if (temp.indexOf(value) > -1 && result.indexOf(value) == -1) {
            result.push(value);
        } else {
            temp.push(value);
        }
    }

    return result;
}


// @returns the union of a1 and a2
const _uniteBy = (compare: Comparator) => <A>(as1: Array<A>) =>
    (as2: Array<A>) =>
        as1.concat(
            as2.filter(isNot(includedInBy(compare)(as1))));


const _intersectBy = (compare: Comparator) => <A>(as1: Array<A>) =>
    (as2: Array<A>) => as1.filter(includedInBy(compare)(as2));