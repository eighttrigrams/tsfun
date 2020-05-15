import {Either, List, Mapping, Maybe, Predicate} from './type'
import {is, on} from './comparator'
import {first} from './list'
import {map, reduce} from './associative'
import {flow} from './composition'
import {filter, size} from './collection'


// ------------ @author Daniel de Oliveira -----------------


export function isDefined(_: any) {

    return _ !== undefined
}


export function isNot<A>(f: Predicate<A>) {

    return (a: A) => flip(f(a))
}


export function isUndefined(what: any) {

    return isNot(isDefined)(what)
}


export function not<T>(p: Predicate<T>) {

    return isNot(p)
}


export function defined(what: any) {

    return isDefined(what)
}


const Undefined = isUndefined


export function undefinedOrEmpty(what: any) {

    return isUndefinedOrEmpty(what)
}


export function empty(what: any) {

    return isEmpty(what)
}


export const has = (path: string|Array<string|number>|number) => (o: Object) =>
    on((isNumber(path) ? [path] : path) as any, isDefined)(o);


export const hasnt = (path: string|Array<string|number>|number) => (o: Object) =>
    not(on((isNumber(path) ? [path] : path) as any, isDefined))(o);


export function and(...preds: Array<Predicate<any>>) {

    return (argument: any): boolean => {

        return reduce((acc: boolean, p: Predicate<any>) => acc && p(argument), true)(preds);
    }
}


export function or(...preds: Array<Predicate<any>>) {

    return (argument: any): any => {

        return reduce((acc: boolean, p: Predicate<any>) => acc || p(argument), false)(preds);
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
        && !isString(coll)) throw 'illegal argument - must be string, object or array'

    return coll instanceof Array
        ? coll.length === 0
        : Object.keys(coll).length === 0
}


export function isEmpty<T>(coll: Object|Array<T>): boolean {

    if (coll === undefined) throw 'illegal argument - arg must not be undefined'
    return isUndefinedOrEmpty(coll)
}


export const flip = (v: boolean) => !v


export const isArray: Predicate = (as: any) => as instanceof Array

// TODO rename to isMap or make alias
export const isObject: Predicate = (o: any) => o instanceof Object && o.constructor === Object


export const isAssociative: Predicate = (a: any) => isObject(a) || isArray(a)


export const isCollection: Predicate = (a: any) => isObject(a) || isArray(a) || isString(a)


export const isList: Predicate = (a: any) => isArray(a) || isString(a)


export const isString: Predicate = (as: any) => typeof as === 'string'


export const isNumber: Predicate = (as: any) => typeof as === 'number'


export const isBoolean: Predicate<any> = (as: any) => typeof as === 'boolean'


export const isFunction: Predicate<any> = (as: any) => typeof as === 'function'


export function isSuccess<E,T>(m: Maybe<T>|Either<E,T>): boolean {

    if (!isEither(m) && !isMaybe(m)) throw 'illegal argument'
    if (m.length === 0) return false
    if (m.length === 1) return true
    if (m.length === 2) return first(m as any) === undefined
    throw 'illegal argument - array too long'
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

    if (!isArray(l)) throw 'illegal argument - array expected'
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
