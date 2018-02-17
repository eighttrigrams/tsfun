import {objT, reduceO} from './core';

export function map<A, B>(f: (_: A) => B): (_: objT<A>) => objT<B> {

    return (coll: objT<A>) => reduceO(f)(Object.keys(coll), coll);
}


export const filter = <T>(predicate: (_: T) => boolean): (_: objT<T>) => objT<T> => {

    return (o: objT<T>) => Object.keys(o).reduce((acc: objT<T>, key: string|number) => {
        if (predicate(o[key])) acc[key] = o[key];
        return acc;
    }, {});
};