import {Either, Mapping, Maybe, Predicate} from './type'
import {is, on} from './comparator'
import {first} from './list'
import {map, reduce} from './associative'
import {flow} from './composition'
import {filter, size} from './collection'


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


export const has = (path: string|Array<string|number>|number) => (o: Object) =>
    on((isNumber(path) ? [path] : path) as any, isDefined)(o)


export const hasnt = (path: string|Array<string|number>|number) => (o: Object) =>
    not(on((isNumber(path) ? [path] : path) as any, isDefined))(o)


export function and(...preds: Array<Predicate<any>>) {

    return (argument): boolean => {

        return reduce((acc: boolean, p: Predicate<any>) => acc && p(argument), true)(preds)
    }
}


export function or(...preds: Array<Predicate<any>>) {

    return (argument): boolean => {

        return reduce((acc: boolean, p: Predicate<any>) => acc || p(argument), false)(preds)
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
        , filter(is(true))
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


export const isArray: Predicate = $ => {

    return Array.isArray($)
    // as instanceof Array <- previously we did it like this, but typescript can check types when we use Array.isArray instead
}

// TODO rename to isMap or make alias
export const isObject: Predicate = o => o instanceof Object && o.constructor === Object


export const isAssociative: Predicate = $ => isObject($) || isArray($)


export const isCollection: Predicate = $ => isObject($) || isArray($) || isString($)


export const isList: Predicate = $ => isArray($) || isString($)


export const isString: Predicate = $ => typeof $ === 'string'


export const isNumber: Predicate = $ => typeof $ === 'number'


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


export function isPair(pair: any) {

    if (!isArray(pair)) return false
    if (pair.length !== 2) return false
    return true
}


export function isSingleton(l: Array<any>) {

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
