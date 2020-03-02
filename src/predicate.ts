// ------------ @author Daniel de Oliveira -----------------

import {Predicate, PredicateProducer} from './type';
import {on} from './comparator';


export const isDefined: Predicate<any> = (_: any) => _ !== undefined;


export const isNot: PredicateProducer = <A>(f: Predicate<A>) =>
    (a: A) => flip(f(a));


export const isUndefined: Predicate<any> = isNot(isDefined);


export const not = isNot;


export const defined = isDefined;


const Undefined = isUndefined;


export const undefinedOrEmpty = isUndefinedOrEmpty;


export const empty = isEmpty;


export const has = (path: string) => (o: Object) => on(path, isDefined)(o);


export const hasNot = (path: string) => (o: Object) => not(on(path, isDefined))(o);


export function and(pred1: Predicate<any>, pred2: Predicate<any>) {

    return (argument: any): any => {

        return pred1(argument) && pred2(argument);
    }
}


export function or(pred1: Predicate<any>, pred2: Predicate<any>) {

    return (argument: any): any => {

        return pred1(argument) || pred2(argument);
    }
}


export function xor(pred1: Predicate<any>, pred2: Predicate<any>) {

    return (argument: any): any => {

        return (pred1(argument) && !pred2(argument)) || (!pred1(argument) && pred2(argument));
    }
}


export function isUndefinedOrEmpty<T>(coll: Object|Array<T>|string|undefined): boolean {

    if (coll === undefined) return true;
    if (!isObject(coll)
        && !isArray(coll)
        && !isString(coll)) throw new TypeError('arg must be string, object or array');

    return coll instanceof Array
        ? coll.length === 0
        : Object.keys(coll).length === 0;
}


export function isEmpty<T>(coll: Object|Array<T>): boolean {

    if (coll === undefined) throw new TypeError('arg must not be undefined');
    return isUndefinedOrEmpty(coll);
}


export const flip = (v: boolean) => !v;


export const isArray: Predicate<any> = (as: any) => as instanceof Array;


export const isObject: Predicate<any> = (o: any) => o instanceof Object && o.constructor === Object;


export const isAssociative: Predicate<any> = (a: any) => isObject(a) || isArray(a);


export const isCollection: Predicate<any> = (a: any) => isObject(a) || isArray(a) || isString(a);


export const isList: Predicate<any> = (a: any) => isArray(a) || isString(a);


export const isString: Predicate<any> = (as: any) => typeof as === 'string';