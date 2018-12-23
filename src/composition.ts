import {Transformation} from './type';


// ------------ @author Daniel de Oliveira -----------------



export const flow = <T>(t: T, ...transformations: Array<Transformation<T>>) =>
    compose(...transformations)(t);


export const composition = flow;


export const compose = <T>(...transformations: Array<Transformation<T>>) => (t: T)  =>
    transformations.reduce((acc, transformation) => transformation(acc), t);


export const wrap = (cloneMethod: Function) =>
    (doFunction: Function) => <T>(param: T) =>
        cloneMethod(doFunction(param)) as T;


// TODO add 'partial' function