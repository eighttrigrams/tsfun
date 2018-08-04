import {TypedMap} from './core';
import {mapProperties} from './core';


/**
 * @author Daniel de Oliveira
 */



// TODO move both functions to src/coll.ts and make them work for both arrays and maps

export function map<A, B>(f: (_: A) => B): (_: TypedMap<A>) => TypedMap<B> {

    return (coll: TypedMap<A>) => mapProperties(f)(Object.keys(coll), coll);
}


export const filter = <T>(predicate: (_: T) => boolean): (_: TypedMap<T>) => TypedMap<T> => {

    return (o: TypedMap<T>) => Object.keys(o).reduce((acc: TypedMap<T>, key: string|number) => {
        if (predicate(o[key])) acc[key] = o[key];
        return acc;
    }, {});
};