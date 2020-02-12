import {identity} from './core';

const composition = <T = any>(t: any, ...transformations: Array<Function>) =>
    compose(...transformations)(t) as T;


export const flow = composition;


export const compose = (...transformations: Array<Function>) => (t: any)  =>
    transformations.reduce((acc, transformation) => transformation(acc), t) as any;


export const cond = <A, B, C>(
    p: (_: A) => boolean,
    f: (_: A) => B,
    g: (_: A) => C = identity as (_: A) => C) => (v: A): B|C => p(v) ? f(v) : g(v);


export const nop = () => {};


export const val = <A>(v: A) => () => v;


export function tuplify(...fs : any[]) {

    return (s: any) => fs.map(f => f(s));
}


export function pairWith(f: any) {

    return tuplify(identity, f);
}