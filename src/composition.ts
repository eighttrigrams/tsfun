import {identity} from './core';
import {ObjectCollection, Predicate} from './type';

const composition = <T = any>(t: any, ...transformations: Array<Function>) =>
    compose(...transformations)(t) as T;


export const flow = composition;


export const compose = (...transformations: Array<Function>) => (t: any)  =>
    transformations.reduce((acc, transformation) => transformation(acc), t) as any;


type Mapping<A, B> = (_: A) => B;

export function cond<A, B, C>(
    p: Predicate<A>|boolean,
    f: Mapping<A, B>|ObjectCollection<B>|Array<B>|number|string|undefined,
    g: Mapping<A, C>|ObjectCollection<C>|Array<C>|number|string|undefined
        = identity as (_: A) => C)
    : (v: A) => B|C|ObjectCollection<B>|ObjectCollection<C>|Array<B>|Array<C>|number|string|undefined {

    return (v: A) => {

        return (typeof p === 'function' ? p(v) : p)
            ? typeof f === 'function' ? f(v) : f
            : typeof g === 'function' ? g(v) : g
    }
}


export const nop = () => {};


export const val = <A>(v: A) => () => v;


export function tuplify(...fs : any[]) {

    return (s: any) => fs.map(f => f(s));
}


export function pairWith(f: any) {

    return tuplify(identity, f);
}