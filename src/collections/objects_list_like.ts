import {Mapping, Predicate, Transformation, TypedMap, TypedObjectList} from '../types';
import {mapProperties} from './objects_coll';


export const mapObject = <A, B>(f: Mapping <A, B>):
    (_: TypedObjectList<A>) => TypedObjectList<B> =>
        (coll: TypedObjectList<A>) => mapProperties(f)(Object.keys(coll), coll);



export const filterObject = <T>(predicate: Predicate<T>): Transformation<TypedObjectList<T>> =>
    (o: TypedObjectList<T>) =>
        Object
            .keys(o)
            .reduce((acc: TypedMap<T>, key: string|number) => {
                if (predicate(o[key])) acc[key] = o[key];
                return acc;
            }, {});