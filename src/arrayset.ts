import {uncurry2} from './core';
import {ArrayList, ArraySet, Comparator, NestedArray} from './type';
import {isNot} from './predicate';
import {includedInBy} from './comparator';

// ------------ @author Daniel de Oliveira -----------------



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
            return uniqueBy(undefined as any)(aas[aas.length - 1]);
        };


export const unionBy =
    (compare?: Comparator) =>
        <A>(aas: NestedArray<A>): ArraySet<A> => {

            if (aas.length < 1) return [];
            if (compare) return aas.reduce(
                (acc: any, val:any) => val ? _uniteBy(compare)(acc)(val) : acc);

            // https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays, answer of Gumbo and Mark Amery
            return uniqueBy(undefined as any)([].concat.apply([], aas));
        };


export const intersectBy =
    (compare?: Comparator) =>
        <A>(as1: Array<A>) =>
            (as2: ArrayList<A>): ArraySet<A> => intersectionBy(compare)<A>([as1, as2]);


export const uniteBy = (compare?: Comparator) => <A>(as1: Array<A>) =>
    (as2: Array<A>): ArraySet<A> => unionBy(compare)([as1, as2]);



// Generate a new list with elements which are contained in as but not in subtrahend
export const subtractBy =
    (compare?: Comparator) =>
        <A>(subtrahend: Array<A>) =>
            (as: ArrayList<A>): ArraySet<A> => {

                const filterFun = compare
                    ? isNot(includedInBy(compare)(subtrahend))
                    : (() => {
                        const unionSubtrahendsSet = new Set(subtrahend);
                        return (x: A) => !unionSubtrahendsSet.has(x);
                    })();

                return uniqueBy(undefined as any)(as).filter(filterFun);
            };


export const uniqueBy = (compare?: Comparator) =>
    <A>(as: ArrayList<A>): ArraySet<A> => {

        return compare
            ? as.reduce((acc: Array<A>, val) =>
                    includedInBy(compare)(acc)(val)
                        ? acc : acc.concat([val])
                ,[])
            : Array.from(new Set(as));
    };


// @returns the union of a1 and a2
const _uniteBy = (compare: Comparator) => <A>(as1: Array<A>) =>
    (as2: Array<A>) =>
        as1.concat(
            as2.filter(isNot(includedInBy(compare)(as1))));


const _intersectBy = (compare: Comparator) => <A>(as1: Array<A>) =>
    (as2: Array<A>) => as1.filter(includedInBy(compare)(as2));


export const intersection = intersectionBy();

export const union = unionBy();

export const intersect = intersectBy();

export const unite = uniteBy();

// Generate a new list with elements which are contained in as but not in subtrahend
export const subtract = subtractBy();

export const unique = uniqueBy();


