import {SimpleTransformation} from './type';
import {identity} from './core';


// ------------ @author Daniel de Oliveira -----------------



const composition = <T>(t: T, ...transformations: Array<SimpleTransformation<T>>) =>
    compose(...transformations)(t);


export const flow = composition;


export const compose = <T>(...transformations: Array<SimpleTransformation<T>>) => (t: T)  =>
    transformations.reduce((acc, transformation) => transformation(acc), t);


/* experimental */ export const wrap = (cloneMethod: Function) =>
    (doFunction: Function) => <T>(param: T) =>
        cloneMethod(doFunction(param)) as T;


export const cond = <A, B, C>(
    p: (_: A) => boolean,
    f: (_: A) => B,
    g: (_: A) => C = identity as (_: A) => C) => (v: A): B|C => p(v) ? f(v) : g(v);


export const nop = () => {};