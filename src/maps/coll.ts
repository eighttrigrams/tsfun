import {TypedMap} from './maps';
import {mapProperties} from './maps';


/**
 * @author Daniel de Oliveira
 */


export function map<A, B>(f: (_: A) => B): (_: TypedMap<A>) => TypedMap<B> {

    return (coll: TypedMap<A>) => mapProperties(f)(Object.keys(coll), coll);
}


export const filter = <T>(predicate: (_: T) => boolean): (_: TypedMap<T>) => TypedMap<T> => {

    return (o: TypedMap<T>) => Object.keys(o).reduce((acc: TypedMap<T>, key: string|number) => {
        if (predicate(o[key])) acc[key] = o[key];
        return acc;
    }, {});
};