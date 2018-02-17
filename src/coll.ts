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


export function mapO<A, B>(f: (_: A) => B): (as: objT<A>) => objT<B> {

    return (coll: objT<A>) => reduceO(f)(Object.keys(coll), coll);
}


export const filter = <A>(predicate: (_: A) => boolean): ArrayTransformation<A> =>
    (as: Array<A>) => as.filter(predicate);


export const reverse = <A>(): ArrayTransformation<A> =>
    (as: Array<A>) => as.reverse();