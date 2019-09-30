import {isNot} from 'tsfun-core';


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


