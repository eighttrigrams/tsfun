import {ObjectCollection} from './type';
import {isDefined} from './predicate';
import {zip} from './arraylist';


// ------------ @author Daniel de Oliveira -----------------

/* internal */ export const mapProperties = <A, B>(f: (_: A) => B) =>
    (keys: Array<number|string>, o: ObjectCollection<A>): ObjectCollection<B> =>
        keys.reduce(mapPropertiesReducer(f)(o), {});


const mapPropertiesReducer = <A, B>(f: (_: A) => B) =>
    (o: any) => (acc: any, val: string) => (acc[val] = f(o[val]), acc);



export const intoObj = <T>(keyName: string, valName: string) =>
    (object: ObjectCollection<T>, item: ObjectCollection<T>) =>
        isDefined(item[keyName])
            ? (object[((item[keyName]) as any).toString()] = item[valName], object)
            : object;


export function keysAndValues<T>(o: ObjectCollection<T>) {

    return zip(Object.keys(o))(Object.values(o));
}



