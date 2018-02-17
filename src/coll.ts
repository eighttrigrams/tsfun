import {subtract} from './sets';
import {subtractO} from './sets-o';
import {Transformation, reducer} from "./core";
/**
 * @author Daniel de Oliveira
 */


type ArrayTransformation<T> = Transformation<Array<T>>;

export type obj = {[prop: string]: any|undefined};
export type objT<T> = {[prop: string]: T};


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

    return (coll: any): any => {

        return coll instanceof Array
            ? coll.map(f)
            : Object.keys(coll).reduce(reducer(f)(coll), {}) as any
    }
}


// These are special versions of the javascript array methods that work within
// the core constraint posed by flow: They take as well as return an Array of A.

export const reduce = <A>(f: (acc: Array<A>, val: A) => Array<A>): ArrayTransformation<A> =>
    (as: Array<A>) => as.reduce(f, []);


export const filter = <A>(predicate: (_: A) => boolean): ArrayTransformation<A> =>
    (as: Array<A>) => as.filter(predicate);


export const reverse = <A>(): ArrayTransformation<A> =>
    (as: Array<A>) => as.reverse();