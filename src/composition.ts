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