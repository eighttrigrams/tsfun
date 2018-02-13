import {flip} from './core';


/**
 * @author Daniel de Oliveira
 */


export const sameAs = <A>(l:A) =>
    (r:A) => l == r;


export const smallerThan = <A>(l:A) =>
    (r:A) => l > r;


export const biggerThan = <A>(l:A) =>
    (r:A) => l < r;


export const includedIn =  <A>(as: Array<A>) =>
    (a: A): boolean => as.includes(a);


export const differentFrom = <A>(a:A) =>
    isNot(sameAs(a));


export const isNot = <A>(f: (_: A) => boolean) =>
    (a: A) => flip(f(a));


export const even = () => (n: number) => n % 2 === 0;


export const odd = () => (n: number) => isNot(even())(n);
