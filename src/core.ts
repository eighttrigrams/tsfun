/**
 * @author Daniel de Oliveira
 */


export type Transformation<T> = (_: T) => T;

export type obj = {[prop: string]: any|undefined};

export type objT<T> = {[prop: string]: T};

export const identical = <A>(v: A) => v;

export const flip = (v: boolean) => !v;

export const uncurry2 = <A>(f: (_: Array<A>) => (_: Array<A>) => Array<A>) =>
    (as1: Array<A>, as2: Array<A>): Array<A> => f(as1)(as2);

const reducer = <A, B>(f: (_: A) => B) => (o: any) => (acc: any, val: string) => (acc[val] = f(o[val]), acc);

export const reduceO = <A, B>(f: (_: A) => B) => (keys: Array<number|string>, o: objT<A>) =>
    keys.reduce(reducer(f)(o), {});