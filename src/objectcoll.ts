import {Mapping, ObjectCollection, Predicate, SimpleTransformation, UntypedObjectCollection} from './type';
import {isDefined} from './predicate';
import {subtractObj} from "./objectset";


// ------------ @author Daniel de Oliveira -----------------

/* internal */ export const mapProperties = <A, B>(f: (_: A) => B) =>
    (keys: Array<number|string>, o: ObjectCollection<A>): ObjectCollection<B> =>
        keys.reduce(mapPropertiesReducer(f)(o), {});


const mapPropertiesReducer = <A, B>(f: (_: A) => B) =>
    (o: any) => (acc: any, val: string) => (acc[val] = f(o[val]), acc);


export const mapObj = <A, B>(f: Mapping <A, B>):
    (_: ObjectCollection<A>) => ObjectCollection<B> =>
    (coll: ObjectCollection<A>) => mapProperties(f)(Object.keys(coll), coll);



export const filterObj = <T>(predicate: Predicate<T>): SimpleTransformation<ObjectCollection<T>> =>
    (o: ObjectCollection<T>) =>
        Object
            .keys(o)
            .reduce((acc: ObjectCollection<T>, key: string|number) => {
                if (predicate(o[key])) acc[key] = o[key];
                return acc;
            }, {});


export const intoObj = <T>(keyName: string, valName: string) =>
    (object: ObjectCollection<T>, item: ObjectCollection<T>) =>
        isDefined(item[keyName])
            ? (object[(item[keyName]).toString()] = item[valName], object)
            : object;


export const copyObj = (o: UntypedObjectCollection): UntypedObjectCollection =>
    subtractObj([])(o);
