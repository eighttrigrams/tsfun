import {subtract} from './sets';
import {subtractO} from './sets-o';
import {Transformation, reduceO, obj, objT} from "./core";
/**
 * @author Daniel de Oliveira
 */


type ArrayTransformation<T> = Transformation<Array<T>>;



export function copy<T>(as: Array<T>): Array<T>;
export function copy(as: obj): obj;
export function copy<T>(coll: Array<T>|obj): Array<T>|obj {

    return coll instanceof Array
        ? subtract([])(coll as any) as Array<T>
        : subtractO([])(coll);
}


export function map<T>(f: (_: T) => T): (as: Array<T>) => Array<T>;
export function map<A, B>(f: (_: A) => B): (as: objT<A>) => objT<B>;
export function map<T>(f: (_: any) => any) {

    return (coll: any): any => coll instanceof Array ? coll.map(f) : reduceO(f)(Object.keys(coll), coll)
}





export const filter = <A>(predicate: (_: A) => boolean): ArrayTransformation<A> =>
    (as: Array<A>) => as.filter(predicate);


export const reverse = <A>(): ArrayTransformation<A> =>
    (as: Array<A>) => as.reverse();