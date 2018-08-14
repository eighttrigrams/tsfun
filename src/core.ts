import {getAtIndex} from './arrays';
import {getElForPathIn} from './objects';


export const identical = <A>(v: A) => v;


export const wrap = (cloneMethod: Function) =>
    (doFunction: Function) => <T>(param: T) =>
        cloneMethod(doFunction(param)) as T;


export const by = identical;


export const uncurry2 = <A>(f: (_: Array<A>) => (_: Array<A>) => Array<A>) =>
    (as1: Array<A>, as2: Array<A>): Array<A> => f(as1)(as2);


export const reverseUncurry2 = <A>(f: (_1: A, _2: A) => A) =>
    (as1: A) => (as2: A) => f(as2, as1);


export const jsonClone = <O>(object: any) => JSON.parse(JSON.stringify(object)) as O;


export const get = <T>(ds: Object|Array<T>, alternative?: any) => (path: string|number) => {

    const result = (typeof path === 'number')
        ? getAtIndex(ds as Array<T>)(path)
        : getElForPathIn(ds as Object, path);

    return result
        ? result
        : alternative;
};


// TODO impl in terms of get and test it
export const to = reverseUncurry2(getElForPathIn);



