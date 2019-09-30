import {isArray, isNot} from 'tsfun-core';
import {Comparator, Predicate} from './type';
import {objectEqualBy, arrayEqualBy, includedInBy,
    differentFromBy, arraySetEqualBy, equalBy, containedInBy} from 'tsfun-core';


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
export const arraySetEqual: Comparator = arraySetEqualBy(undefined as any);


export const objectEqual: Comparator = objectEqualBy(arrayEqual as any);


export const equal = equalBy(arrayEqual as any);


export const equalTo = equal;


export const equivalent = equalBy(arraySetEqual);


export const by = <A>(p: Predicate<A>) => p;