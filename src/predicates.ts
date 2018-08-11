import {Predicate, PredicateProducer} from './types';


export const isNot: PredicateProducer = <A>(f: Predicate<A>) =>
    (a: A) => flip(f(a));


export const isDefined: Predicate<any> = (_: any) => _ !== undefined;


export const defined = isDefined;


export const isUndefined: Predicate<any> = isNot(defined);


export function isUndefinedOrEmpty<T>(coll: Object|Array<T>|undefined): boolean {

    if (!coll) return true;
    if (!isObject(coll) && !isArray(coll)) throw new TypeError('neither an Array nor an Object in isUndefinedOrEmpty');

    return coll instanceof Array
        ? coll.length === 0
        : Object.keys(coll).length === 0;
}

export const undefinedOrEmpty = isUndefinedOrEmpty;


export function isEmpty<T>(coll: Object|Array<T>): boolean {

    if (!coll) throw new TypeError('neither an Array nor an Object in isEmpty');
    if (!isObject(coll) && !isArray(coll)) throw new TypeError('neither an Array nor an Object in isEmpty');

    return coll instanceof Array
        ? coll.length === 0
        : Object.keys(coll).length === 0;
}

export const empty = isEmpty;


export const flip = (v: boolean) => !v;


export const isEven: Predicate<number> = (n: number) => n % 2 === 0;


export const even = isEven;


export const isOdd: Predicate<number> = (n: number) => isNot(isEven)(n);


export const odd = isOdd;


export const isArray: Predicate<any> = (as: any) => as instanceof Array;


export const isObject: Predicate<any> = (o: any) => o instanceof Object && o.constructor === Object;


export const isTrue: Predicate<boolean> = (b: boolean) => b === true;


export const isFalse: Predicate<boolean> = (b: boolean) => b === false;