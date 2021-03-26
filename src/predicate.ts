import {Array2, Either, Mapping, Maybe, Pair, Predicate, Singleton, Path, Associative, Key} from './type'
import {is, on} from './comparator'
import {first} from './array'
import {map, $reduce_a, filter} from './associative'
import {flow} from './composition'
import {size} from './associative'


export function isDefined($) {

    return $ !== undefined
}


export function isNot<A>(f: Predicate<A>) {

    return (a: A) => flip(f(a))
}


export function isUndefined($) {

    return isNot(isDefined)($)
}


export function not<T>(p: Predicate<T>) {

    return isNot(p)
}


export function defined($) {

    return isDefined($)
}


const Undefined = isUndefined


export function undefinedOrEmpty($) {

    return isUndefinedOrEmpty($)
}


export function empty($) {

    return isEmpty($)
}


export const has = (path: Path) => (o: Object) =>
    on(path as any, isDefined)(o)


export const hasnt = (path: Path) => (o: Object) =>
    not(on(path as any, isDefined))(o)


export function and(...preds: Array<Predicate<any>>) {

    return (argument): boolean => {

        return $reduce_a((acc: boolean, p: Predicate<any>) => acc && p(argument), true)(preds)
    }
}


export function or(...preds: Array<Predicate<any>>) {

    return (argument): boolean => {

        return $reduce_a((acc: boolean, p: Predicate<any>) => acc || p(argument), false)(preds)
    }
}


// TODO move, review and, or etc.
function applyTo<A>(arg: A) {

    return <B>(f: Mapping<A,B>) => f(arg)
}


export function xor<A>(...preds: Array<Predicate<A>>) {

    return (argument: A): boolean =>
        flow(preds
        , map(applyTo(argument))
        , filter(is(true)) as any
        , size
        , is(1))
}


export function isUndefinedOrEmpty<T>(coll: Object|Array<T>|string|undefined): boolean {

    if (coll === undefined) return true
    if (!isObject(coll)
        && !isArray(coll)
        && !isString(coll)) throw 'illegal argument - in \'isUndefinedOrEmpty\' - must be string, object or array'

    return coll instanceof Array
        ? coll.length === 0
        : Object.keys(coll).length === 0
}


export function isEmpty<T>(coll: Object|Array<T>): boolean {

    if (coll === undefined) throw 'illegal argument - in \'isEmpty\' - arg must not be undefined'
    return isUndefinedOrEmpty(coll)
}


export const flip = (v: boolean) => !v


export function isArray<T = any, V = any>(t: T|Array<V>): t is Array<V> {

    return Array.isArray(t)
    // as instanceof Array <- previously we did it like this, but typescript can check types when we use Array.isArray instead
}


export function isArray2<T = any, V = any>(t: T|Array2<V>): t is Array2<V> {
    return Array.isArray(t) && t.length > 1;
}


// TODO rename to isMap or make alias
export const isObject: Predicate = o => o instanceof Object && o.constructor === Object


export function isAssociative(a: any): a is Associative {

    return isObject(a) || isArray(a)
}


export function isKey(a): a is Key {

    return isArray2(a) || isNumber(a)||isString(a)
}


export function isString<T = any>(t: T|string): t is string {
    return typeof t === 'string'
}


export function isNumber<T = any>(t: T|number): t is number {
    return typeof t === 'number'
}

export const isBoolean: Predicate = $ => typeof $ === 'boolean'


export const isFunction: Predicate = $ => typeof $ === 'function'


export function isSuccess<E,T>(m: Maybe<T>|Either<E,T>): boolean {

    if (!isEither(m) && !isMaybe(m)) throw 'illegal argument - in \'isSuccess\''
    if (m.length === 0) return false
    if (m.length === 1) return true
    if (m.length === 2) return first(m as any) === undefined
    throw 'illegal argument - in \'isSuccess\' - array too long'
}


export function isFailure<T, E = any>(m: Maybe<T>|Either<E,T>) {

    return !isSuccess(m)
}


export function isPair(pair: any): pair is Pair {

    if (!isArray(pair)) return false
    if (pair.length !== 2) return false
    return true
}


export function isSingleton(l: Array<any>): l is Singleton {

    if (!isArray(l)) throw 'illegal argument - in \'isSingleton\' - array expected'
    if (l.length !== 1) return false
    return true
}


export function isEither(either: any) {

    if (!isArray(either)) return false
    if (either.length !== 2) return false
    if (either.filter(isDefined).length !== 1) return false
    return true
}


export function isMaybe(maybe: any) {

    if (!isArray(maybe)) return false
    if (maybe.length > 1) return false
    return true
}
