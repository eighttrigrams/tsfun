import {identity} from './core';


// ------------ @author Daniel de Oliveira -----------------



const composition = (t: any, ...transformations: Array<Function>) =>
    compose(...transformations)(t) as any;


export const flow = composition;


export const compose = (...transformations: Array<Function>) => (t: any)  =>
    transformations.reduce((acc, transformation) => transformation(acc), t) as any;


export const cond = <A, B, C>(
    p: (_: A) => boolean,
    f: (_: A) => B,
    g: (_: A) => C = identity as (_: A) => C) => (v: A): B|C => p(v) ? f(v) : g(v);


export const nop = () => {};