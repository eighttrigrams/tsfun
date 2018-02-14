import {uncurry2} from './core';
import {includedIn, isNot} from "./predicates";


export type NestedArray<A> = Array<Array<A>>;


export const intersection = <A>(aas: NestedArray<A>): Array<A> =>
    aas.length < 1 ? [] :
        aas.reduce(uncurry2<A>(intersect));


export const union = <A>(aas: NestedArray<A>): Array<A> =>
    aas.length < 1 ? [] :
        aas.reduce((acc, val) => val ? unite(acc)(val) : acc);


export const intersect = <A>(as1: Array<A>) =>
    (as2: Array<A>) => as1.filter(includedIn(as2));


/**
 * Generate a new list with elements which are contained in as but not in subtrahend
 */
export const subtract = <A>(subtrahend: Array<A>) =>
    (as: Array<A>): Array<A> =>
        ((unique<A>()(as)).filter(isNot(includedIn(subtrahend))));


/**
 * @returns the union of a1 and a2
 */
export const unite = <A>(as1: Array<A>) =>
    (as2: Array<A>) =>
        as1.concat(
            as2.filter(isNot(includedIn(as1))));


export const unique = <A>() => (as: Array<A>) =>
    as.reduce((acc: Array<A>, val) =>
             acc.includes(val) ? acc : acc.concat([val])
        ,[]);


export const subtractO = (subtrahend: Array<string|number>|any) =>
    (o: {[prop: string]: any}): {[prop: string]: any} => {

        const result = Array.isArray(subtrahend)
            ? (subtract(subtrahend.map(_ => _.toString()))(Object.keys(o)))
                .reduce(reducer(o), {})
            : (subtract(Object.keys(subtrahend))(Object.keys(o)))
                .reduce(reducer(o), {});

        return (Array.isArray(o)) ? Object.values(result) : result;
    };


export const uniteO = (addend: Array<string|number>|any) =>
    (o: {[prop: string]: any}): {[prop: string]: any} =>
        Object.assign({}, o, addend);


export const intersectO = (o1: any) =>
    (o2: {[prop: string]: any}): {[prop: string]: any} =>
        intersect(Object.keys(o1))(Object.keys(o2)).reduce(reducer(o1), {});


const reducer = (o: any) => (acc: any, val: string) => (acc[val] = o[val], acc);