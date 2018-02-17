import {objT} from './objects';
import {mapProperties} from './objects';


/**
 * @author Daniel de Oliveira
 */


export function map<A, B>(f: (_: A) => B): (_: objT<A>) => objT<B> {

    return (coll: objT<A>) => mapProperties(f)(Object.keys(coll), coll);
}


export const filter = <T>(predicate: (_: T) => boolean): (_: objT<T>) => objT<T> => {

    return (o: objT<T>) => Object.keys(o).reduce((acc: objT<T>, key: string|number) => {
        if (predicate(o[key])) acc[key] = o[key];
        return acc;
    }, {});
};