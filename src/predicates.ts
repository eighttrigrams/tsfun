import {Predicate, PredicateProducer} from './types';
import {on} from './comparators';


export const isNot: PredicateProducer = <A>(f: Predicate<A>) =>
    (a: A) => flip(f(a));


export const not = isNot;


export const isDefined: Predicate<any> = (_: any) => _ !== undefined;


export const defined = isDefined;


export const isUndefined: Predicate<any> = isNot(defined);


export function isUndefinedOrEmpty<T>(coll: Object|Array<T>|undefined): boolean {

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


export const flip = (v: boolean) => !v;


export const isArray: Predicate<any> = (as: any) => as instanceof Array;


export const isObject: Predicate<any> = (o: any) => o instanceof Object && o.constructor === Object;


export const isString: Predicate<any> = (as: any) => typeof as === 'string';


export const isTrue: Predicate<boolean> = (b: boolean) => b === true;


export const isFalse: Predicate<boolean> = (b: boolean) => b === false;


export const has = (path: string) => (o: Object) => on(path, isDefined)(o);


export const hasNot = (path: string) => (o: Object) => not(on(path, isDefined))(o);