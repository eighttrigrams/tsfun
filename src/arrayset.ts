import {Comparator, NestedArray} from './type';
import {includedInBy, tripleEqual} from './comparator';
import {uncurry2} from './core';
import {isNot} from './predicate';

// ------------ @author Daniel de Oliveira -----------------


export const intersectionBy =
    (compare: Comparator = tripleEqual) =>
        <A>(aas: NestedArray<A>): Array<A> =>
            aas.length < 1 ? [] :
                aas.reduce(uncurry2<A>(_intersectBy(compare)));


export const intersection = intersectionBy();


export const unionBy =
    (compare: Comparator = tripleEqual) =>
        <A>(aas: NestedArray<A>): Array<A> =>
        aas.length < 1 ? [] :
            aas.reduce((acc, val) => val ? _uniteBy(compare)(acc)(val) : acc);


export const union = unionBy();


export const intersectBy =
    (compare: Comparator = tripleEqual) =>
        <A>(...aas: NestedArray<A>) =>
            (as: Array<A>) => intersectionBy(compare)<A>(aas.concat([as]));


export const intersect = intersectBy();


export const uniteBy = (compare: Comparator = tripleEqual) => <A>(...aas: NestedArray<A>) =>
    (as: Array<A>) => unionBy(compare)(aas.concat([as]));


export const unite = uniteBy();


// Generate a new list with elements which are contained in as but not in subtrahend
export const subtractBy =
    (compare: Comparator = tripleEqual) =>
        <A>(...subtrahends: NestedArray<A>) =>
            (as: Array<A>): Array<A> =>
                ((unique<A>(as)).filter(isNot(includedInBy(compare)(union(subtrahends)))));


// Generate a new list with elements which are contained in as but not in subtrahend
export const subtract = subtractBy();


export const uniqueBy = (compare: Comparator = tripleEqual) =>
    <A>(as: Array<A>) =>
        as.reduce((acc: Array<A>, val) =>
            includedInBy(compare)(acc)(val)
                ? acc : acc.concat([val])
        ,[]);


export const unique = uniqueBy();


// TODO add test
// Contributed by Thomas Kleinke
export function duplicates<A>(array: Array<A>): Array<A> {

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