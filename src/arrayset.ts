import {ArrayList, ArraySet, Comparator, NestedArray} from './type';
import {includedInBy, tripleEqual} from './comparator';
import {uncurry2} from './core';
import {isNot} from './predicate';

// ------------ @author Daniel de Oliveira -----------------


export const intersectionBy =
    (compare?: Comparator) =>
        <A>(aas: NestedArray<A>): ArraySet<A> => {

            if (aas.length < 1) return [];
            if (aas.length === 1) return aas[0];

            if (compare) return aas.reduce(uncurry2<A>(_intersectBy(compare)));

            for (let i = 0; i < aas.length - 1; i++) {
                // see https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript, answer of le_m
                aas[i+1] = aas[i].filter(Set.prototype.has, new Set(aas[i + 1]));
            }
            return Array.from(new Set( // remove duplicates
                aas[aas.length - 1])
            );
};


export const intersection = intersectionBy();


export const unionBy =
    (compare: Comparator = tripleEqual) =>
        <A>(aas: NestedArray<A>): ArraySet<A> =>
        aas.length < 1 ? [] :
            aas.reduce((acc, val) => val ? _uniteBy(compare)(acc)(val) : acc);


export const union = unionBy();


export const intersectBy =
    (compare?: Comparator) =>
        <A>(...aas: NestedArray<A>) =>
            (as: ArrayList<A>): ArraySet<A> => intersectionBy(compare)<A>(aas.concat([as]));


export const intersect = intersectBy();


export const uniteBy = (compare: Comparator = tripleEqual) => <A>(...aas: NestedArray<A>) =>
    (as: Array<A>): ArraySet<A> => unionBy(compare)(aas.concat([as]));


export const unite = uniteBy();


// Generate a new list with elements which are contained in as but not in subtrahend
export const subtractBy =
    (compare: Comparator = tripleEqual) =>
        <A>(...subtrahends: NestedArray<A>) =>
            (as: ArrayList<A>): ArraySet<A> =>
                ((unique<A>(as)).filter(isNot(includedInBy(compare)(union(subtrahends)))));


// Generate a new list with elements which are contained in as but not in subtrahend
export const subtract = subtractBy();


export const uniqueBy = (compare: Comparator = tripleEqual) =>
    <A>(as: ArrayList<A>): ArraySet<A> =>
        as.reduce((acc: Array<A>, val) =>
            includedInBy(compare)(acc)(val)
                ? acc : acc.concat([val])
        ,[]);


export const unique = uniqueBy();


// TODO add test
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
const _uniteBy = (compare: Comparator = tripleEqual) => <A>(as1: Array<A>) =>
    (as2: Array<A>) =>
        as1.concat(
            as2.filter(isNot(includedInBy(compare)(as1))));


const _intersectBy = (compare: Comparator = tripleEqual) => <A>(as1: Array<A>) =>
    (as2: Array<A>) => as1.filter(includedInBy(compare)(as2));