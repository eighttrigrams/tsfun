import {TypedMap} from './core';
import {mapProperties} from './core';


export function mapMap<A, B>(f: (_: A) => B): (_: TypedMap<A>) => TypedMap<B> {

    return (coll: TypedMap<A>) => mapProperties(f)(Object.keys(coll), coll);
}


export const filterMap = <T>(predicate: (_: T) => boolean): (_: TypedMap<T>) => TypedMap<T> => {

    return (o: TypedMap<T>) => Object.keys(o).reduce((acc: TypedMap<T>, key: string|number) => {
        if (predicate(o[key])) acc[key] = o[key];
        return acc;
    }, {});
};