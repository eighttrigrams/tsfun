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


export function mapO<A, B>(f: (_: A) => B): (_: objT<A>) => objT<B> {

    return (coll: objT<A>) => reduceO(f)(Object.keys(coll), coll);
}


export const filterO = <T>(predicate: (_: T) => boolean): (_: objT<T>) => objT<T> => {

    return (o: objT<T>) => Object.keys(o).reduce((acc: objT<T>, key: string|number) => {
            if (predicate(o[key])) acc[key] = o[key];
            return acc;
        }, {});
};


export const reverse = <A>(): ArrayTransformation<A> =>
    (as: Array<A>) => as.reverse();