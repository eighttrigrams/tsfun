import {Predicate} from './type';
import {isArray, isNot, isObject, on} from 'tsfun-core';

// ------------ @author Daniel de Oliveira -----------------

export const not = isNot;


export const isDefined: Predicate<any> = (_: any) => _ !== undefined;


export const defined = isDefined;


export const isUndefined: Predicate<any> = isNot(defined);


const Undefined = isUndefined;


export function isUndefinedOrEmpty<T>(coll: Object|Array<T>|string|undefined): boolean {

    if (coll === undefined) return true;
    if (!isObject(coll)
        && !isArray(coll)
        && !isString(coll)) throw new TypeError('arg must be string, object or array');

    return coll instanceof Array
        ? coll.length === 0
        : Object.keys(coll).length === 0;
}

export const undefinedOrEmpty = isUndefinedOrEmpty;


export function isEmpty<T>(coll: Object|Array<T>): boolean {

    if (coll === undefined) throw new TypeError('arg must not be undefined');
    return isUndefinedOrEmpty(coll);
}

export const empty = isEmpty;


export const isString: Predicate<any> = (as: any) => typeof as === 'string';


export const has = (path: string) => (o: Object) => on(path, isDefined)(o);


export const hasNot = (path: string) => (o: Object) => not(on(path, isDefined))(o);