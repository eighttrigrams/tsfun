import {Array2, Either, Mapping, Maybe, Pair, Predicate, Singleton, Associative, Key, Fallible, Err, Ok} from './type'
import {is} from './comparator'
import {first} from './array'
import {map, $reduce_a, filter} from './associative'
import {flow} from './composition'
import {size} from './associative'
import { throwIllegalArgs } from './core'


/**
 * tsfun | isDefined
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_defined.spec.ts
 */
export function isDefined($) {

    return $ !== undefined
}


/**
 * tsfun | not
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_not.spec.ts
 */
export function not<T>(p: Predicate<T>) {

    return isNot(p)
}


/**
 * tsfun | isNot
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_not.spec.ts
 */
export function isNot<A>(f: Predicate<A>) {

    return (a: A) => flip(f(a))
}


/**
 * tsfun | isUndefined
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_undefined.spec.ts
 */
export function isUndefined($) {

    return isNot(isDefined)($)
}


/**
 * tsfun | isUndefinedOrEmpty
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_undefined_or_empty.spec.ts
 */
export function isUndefinedOrEmpty<T>(coll: Object|Array<T>|string|undefined): boolean {

    if (coll === undefined) return true
    if (!isObject(coll)
        && !isArray(coll)
        && !isString(coll)) throw 'illegal argument - in \'isUndefinedOrEmpty\' - must be string, object or array'

    return coll instanceof Array
        ? coll.length === 0
        : Object.keys(coll).length === 0
}


/**
 * tsfun | isEmpty
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_empty.spec.ts
 */
export function isEmpty<T>(coll: Object|Array<T>): boolean {

    if (coll === undefined) throw 'illegal argument - in \'isEmpty\' - arg must not be undefined'
    return isUndefinedOrEmpty(coll)
}


/**
 * tsfun | and
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/and.spec.ts
 */
export function and(...preds: Array<Predicate<any>>) {

    return (argument): boolean => {

        return $reduce_a((acc: boolean, p: Predicate<any>) => acc && p(argument), true)(preds)
    }
}


/**
 * tsfun | or
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/or.spec.ts
 */
export function or(...preds: Array<Predicate<any>>) {

    return (argument): boolean => {

        return $reduce_a((acc: boolean, p: Predicate<any>) => acc || p(argument), false)(preds)
    }
}


// TODO move, review and, or etc.
function applyTo<A>(arg: A) {

    return <B>(f: Mapping<A,B>) => f(arg)
}


/**
 * tsfun | xor
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/xor.spec.ts
 */
export function xor<A>(...preds: Array<Predicate<A>>) {

    return (argument: A): boolean =>
        flow(preds
        , map(applyTo(argument))
        , filter(is(true)) as any
        , size
        , is(1))
}


/**
 * tsfun | isArray
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_array.spec.ts
 */
export function isArray<T = any, V = any>(t: T|Array<V>): t is Array<V> {

    return Array.isArray(t)
    // as instanceof Array <- previously we did it like this, but typescript can check types when we use Array.isArray instead
}


export function isArray2<T = any, V = any>(t: T|Array2<V>): t is Array2<V> {
    return Array.isArray(t) && t.length > 1;
}


/**
 * tsfun | isObject
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_object.spec.ts
 */
export const isObject: Predicate = o => o instanceof Object && o.constructor === Object


/**
 * tsfun | isAssociative
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_associative.spec.ts
 */
export function isAssociative(a: any): a is Associative {

    return isObject(a) || isArray(a)
}


/**
 * tsfun | isString
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_string.spec.ts
 */
export function isString<T = any>(t: T|string): t is string {
    return typeof t === 'string'
}


/**
 * tsfun | isNumber
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_number.spec.ts
 */
export function isNumber<T = any>(t: T|number): t is number {
    return typeof t === 'number'
}


/**
 * tsfun | isBoolean
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_boolean.spec.ts
 */
export const isBoolean: Predicate = $ => typeof $ === 'boolean'


/**
 * tsfun | isFunction
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_function.spec.ts
 */
export const isFunction: Predicate = $ => typeof $ === 'function'


/**
 * tsfun | isOk
 *
 * Tells whether a Fallible (Maybe or Either) is a success
 *
 * ```
 * >> isOk([1])
 * true
 * >> isOk([])
 * false
 * >> isOk([undefined, 1])
 * true
 * >> isOk([1, undefined])
 * false
 * ```
 *
 * Use `tsfun | ok` afterwards, to access the success value
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_ok.spec.ts
 */
export function isOk<T>(f: Fallible<T>): f is Ok<T> {

    if (!isEither(f) && !isMaybe(f)) throwIllegalArgs('isOk', 'Fallible', f)
    if (f.length === 0) return false
    if (f.length === 1) return true
    if (f.length === 2) return first(f as any) === undefined
    throwIllegalArgs('isOk', 'Fallible', f)
    return 0 as never
}


/**
 * tsfun | isErr

 * Tells whether a Fallible (Maybe or Either) is a failure
 *
 * ```
 * >> isErr([1])
 * false
 * >> isErr([])
 * true
 * >> isErr([undefined, 1])
 * false
 * >> isErr([1, undefined])
 * true
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_err.spec.ts
 */
export function isErr<T, E = any>(f: Maybe<T>|Either<E,T>): f is Err<E> {

    return !isOk(f)
}


/**
 * tsfun | isPair
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_pair.spec.ts
 */
export function isPair(pair: any): pair is Pair {

    if (!isArray(pair)) return false
    if (pair.length !== 2) return false
    return true
}


/**
 * tsfun | isSingleton
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_singleton.spec.ts
 */
export function isSingleton(l: Array<any>): l is Singleton {

    if (!isArray(l)) throw 'illegal argument - in \'isSingleton\' - array expected'
    if (l.length !== 1) return false
    return true
}


/**
 * tsfun | isEither
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_either.spec.ts
 */
export function isEither(either: any) {

    if (!isArray2(either)) return false
    if (either.filter(isDefined).length !== 1) return false
    return true
}


/**
 * tsfun | isMaybe
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_maybe.spec.ts
 */
export function isMaybe(maybe: any) {

    if (!isArray(maybe)) return false
    if (maybe.length > 1) return false
    return true
}


export function isKey(a): a is Key {

    return isArray2(a) || isNumber(a)||isString(a)
}


export const flip = (v: boolean) => !v


/**
 * tsfun | isPrimitive
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/predicate/is_primitive.spec.ts
 */
export const isPrimitive = (struct: any) =>
    isNumber(struct)||isString(struct)||isBoolean(struct)||struct === undefined||struct === null;

