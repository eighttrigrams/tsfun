import {flip} from './core';


/**
 * @author Daniel de Oliveira
 */


export const sameAs = <A>(l:A) =>
    (r:A) => l == r;


export const smaller = <A>(l:A) =>
    (r:A) => l > r;


export const bigger = <A>(l:A) =>
    (r:A) => l < r;


export const includedIn =  <A>(as: Array<A>) =>
    (a: A): boolean => as.includes(a);


export const differentFrom = <A>(a:A) =>
    isNot(sameAs(a));


export const isNot = <A>(f: (_: A) => boolean) =>
    (a: A) => flip(f(a));