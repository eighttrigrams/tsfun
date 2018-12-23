import {Mapping, Predicate, Transformation, TypedMap, ObjectList} from '../types';
import {mapProperties} from './objects_coll';


export const mapObject = <A, B>(f: Mapping <A, B>):
    (_: ObjectList<A>) => ObjectList<B> =>
        (coll: ObjectList<A>) => mapProperties(f)(Object.keys(coll), coll);



export const filterObject = <T>(predicate: Predicate<T>): Transformation<ObjectList<T>> =>
    (o: ObjectList<T>) =>
        Object
            .keys(o)
            .reduce((acc: TypedMap<T>, key: string|number) => {
                if (predicate(o[key])) acc[key] = o[key];
                return acc;
            }, {});