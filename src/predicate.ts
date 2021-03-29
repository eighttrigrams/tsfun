import {Array2, Either, Mapping, Maybe, Pair, Predicate, Singleton, Path, Associative, Key} from './type'
import {is, on} from './comparator'
import {first} from './array'
import {map, $reduce_a, filter} from './associative'
import {flow} from './composition'
import {size} from './associative'


/**
 * tsfun | isDefined
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_defined.spec.ts
 */
export function isDefined($) {

    return $ !== undefined
}


/**
 * tsfun | defined
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_defined.spec.ts
 */
export function defined($) {

    return isDefined($)
}


/**
 * tsfun | not
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_not.spec.ts
 */
export function not<T>(p: Predicate<T>) {

    return isNot(p)
}


/**
 * tsfun | isNot
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_not.spec.ts
 */
export function isNot<A>(f: Predicate<A>) {

    return (a: A) => flip(f(a))
}


/**
 * tsfun | isUndefined
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_undefined.spec.ts
 */
export function isUndefined($) {

    return isNot(isDefined)($)
}


/**
 * tsfun | undefinedOrEmpty
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_undefined_or_empty.spec.ts
 */
export function undefinedOrEmpty($) {

    return isUndefinedOrEmpty($)
}


/**
 * tsfun | isUndefinedOrEmpty
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_undefined_or_empty.spec.ts
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
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_empty.spec.ts
 */
export function isEmpty<T>(coll: Object|Array<T>): boolean {

    if (coll === undefined) throw 'illegal argument - in \'isEmpty\' - arg must not be undefined'
    return isUndefinedOrEmpty(coll)
}



/**
 * tsfun | empty
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/empty.spec.ts
 */
export function empty($) {

    return isEmpty($)
}


/**
 * tsfun | and
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/and.spec.ts
 */
export function and(...preds: Array<Predicate<any>>) {

    return (argument): boolean => {

        return $reduce_a((acc: boolean, p: Predicate<any>) => acc && p(argument), true)(preds)
    }
}


/**
 * tsfun | or
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/or.spec.ts
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
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/xor.spec.ts
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
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_array.spec.ts
 */
export function isArray<T = any, V = any>(t: T|Array<V>): t is Array<V> {

    return Array.isArray(t)
    // as instanceof Array <- previously we did it like this, but typescript can check types when we use Array.isArray instead
}


export function isArray2<T = any, V = any>(t: T|Array2<V>): t is Array2<V> {
    return Array.isArray(t) && t.length > 1;
}


// TODO rename to isMap or make alias
/**
 * tsfun | isObject
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_object.spec.ts
 */
export const isObject: Predicate = o => o instanceof Object && o.constructor === Object


/**
 * tsfun | isAssociative
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_associative.spec.ts
 */
export function isAssociative(a: any): a is Associative {

    return isObject(a) || isArray(a)
}


/**
 * tsfun | isString
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_string.spec.ts
 */
export function isString<T = any>(t: T|string): t is string {
    return typeof t === 'string'
}


/**
 * tsfun | isNumber
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_number.spec.ts
 */
export function isNumber<T = any>(t: T|number): t is number {
    return typeof t === 'number'
}


/**
 * tsfun | isBoolean
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_boolean.spec.ts
 */
export const isBoolean: Predicate = $ => typeof $ === 'boolean'


/**
 * tsfun | isFunction
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_function.spec.ts
 */
export const isFunction: Predicate = $ => typeof $ === 'function'


/**
 * tsfun | isSuccess
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_success.spec.ts
 */
export function isSuccess<E,T>(m: Maybe<T>|Either<E,T>): boolean {

    if (!isEither(m) && !isMaybe(m)) throw 'illegal argument - in \'isSuccess\''
    if (m.length === 0) return false
    if (m.length === 1) return true
    if (m.length === 2) return first(m as any) === undefined
    throw 'illegal argument - in \'isSuccess\' - array too long'
}


/**
 * tsfun | isFailure
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_failure.spec.ts
 */
export function isFailure<T, E = any>(m: Maybe<T>|Either<E,T>) {

    return !isSuccess(m)
}


/**
 * tsfun | isPair
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_pair.spec.ts
 */
export function isPair(pair: any): pair is Pair {

    if (!isArray(pair)) return false
    if (pair.length !== 2) return false
    return true
}


/**
 * tsfun | isSingleton
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_singleton.spec.ts
 */
export function isSingleton(l: Array<any>): l is Singleton {

    if (!isArray(l)) throw 'illegal argument - in \'isSingleton\' - array expected'
    if (l.length !== 1) return false
    return true
}


/**
 * tsfun | isEither
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_either.spec.ts
 */
export function isEither(either: any) {

    if (!isArray(either)) return false
    if (either.length !== 2) return false
    if (either.filter(isDefined).length !== 1) return false
    return true
}


/**
 * tsfun | isMaybe
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/predicate/is_maybe.spec.ts
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

const Undefined = isUndefined
