import {SimpleTransformation} from './type';


// ------------ @author Daniel de Oliveira -----------------



const composition = <T>(t: T, ...transformations: Array<SimpleTransformation<T>>) =>
    compose(...transformations)(t);


export const flow = composition;


export const compose = <T>(...transformations: Array<SimpleTransformation<T>>) => (t: T)  =>
    transformations.reduce((acc, transformation) => transformation(acc), t);


/* experimental */ export const wrap = (cloneMethod: Function) =>
    (doFunction: Function) => <T>(param: T) =>
        cloneMethod(doFunction(param)) as T;


// TODO review, see if we can find other package where it fits in better
// TODO write test
export const when = <A, B>(p: (_: A) => boolean, f: (_: A) => B, otherwise: B) => (v: A): B => p(v) ? f(v) : otherwise;