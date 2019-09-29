import {isArray, isNot} from 'tsfun-core';
import {Comparator, Predicate} from './type';
import {objectEqualBy, arrayEqualBy, includedInBy,
    differentFromBy, arrayEquivalentBy, equalBy, containedInBy} from 'tsfun-core';


// ------------ @author Daniel de Oliveira -----------------


export const tripleEqual: any = <A>(l:A) =>
    (r:A) => l === r;


export const is = tripleEqual;


export const isnt = <A>(l: A) => isNot(tripleEqual(l));


export const jsonEqual: any = <A>(l:A) =>
    (r:A) => tripleEqual(JSON.stringify(l))(JSON.stringify(r));


/* internal */ export const greaterThan: any = <A>(l:A) =>
    (r: A) => l < r;


/* internal */ export const lessThan: any = <A>(l:A) =>
    (r: A) => l > r;


export const differentFrom = differentFromBy(tripleEqual);


export const includedIn =  includedInBy(tripleEqual);


export const containedIn = containedInBy(tripleEqual);


export const arrayEqual = arrayEqualBy(undefined as any);


// Compares 2 arrays where elements order does not matter
export const arrayEquivalent: Comparator = arrayEquivalentBy(undefined as any);


export const objectEqual: Comparator = objectEqualBy(arrayEqual as any);


export const equal = equalBy(arrayEqual as any);


export const equalTo = equal;


export const equivalent = equalBy(arrayEquivalent);



// TODO implement that arbitrary subtrees can get excluded
export const without = (path: string|string[], compare: Function = tripleEqual) =>
    (l: any): any => {

        const keys = Object
            .keys(l)
            .filter(isNot(
                isArray(path)
                    ? includedIn(path as string[])
                    : equalTo(path)));

        return typeof compare(l) === 'function'
            ? (r: any) => keys.reduce((acc, key) => acc && compare(r[key])(l[key]), true)
            : keys.reduce((acc, key) => acc && compare(l[key]), true)
    };


export const by = <A>(p: Predicate<A>) => p;