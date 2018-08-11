import {mapProperties} from './core';
import {Predicate, Transformation, TypedMap} from '../types';


export const mapMap = <A, B>(f: (_: A) => B) /* this could be a type Mapping */:
    (_: TypedMap<A>) => TypedMap<B> =>
        (coll: TypedMap<A>) => mapProperties(f)(Object.keys(coll), coll);



export const filterMap = <T>(predicate: Predicate<T>): Transformation<TypedMap<T>> =>
    (o: TypedMap<T>) =>
        Object
            .keys(o)
            .reduce((acc: TypedMap<T>, key: string|number) => {
                if (predicate(o[key])) acc[key] = o[key];
                return acc;
            }, {});
