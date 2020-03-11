import {identity} from './core';
import {Either, Fallible, Mapping, Maybe, Predicate} from './type';
import {isEither, isFailure, isMaybe, isSuccess} from './predicate';
import {first, rest, reverse} from './list';
import {either, getValue, maybe} from './tuple';


const composition = <T = any>(t: any, ...transformations: Array<Function>) =>
    compose(...transformations)(t) as T;


export const flow = composition;


export const compose = (...transformations: Array<Function>) => (t: any)  =>
    transformations.reduce((acc, transformation) => transformation(acc), t) as any;


export function cond<A, B, C>(
    p: boolean|Predicate<A>,
    f: Mapping<A, B>|B,
    g: Mapping<A, C>|C
        = identity as (_: A) => C)
    : (v: A) => B|C {

    return (v: A) => {

        return (typeof p === 'function' ? p(v) : p)
            ? typeof f === 'function' ? (f as Mapping<A,B>)(v) : f
            : typeof g === 'function' ? (g as Mapping<A,C>)(v) : g
    }
}


export function nop() {}


export function val<A>(v: A) { return () => v }


export function throws(e: any) {

    return (): any => { throw e };
}


export function multidentity<T>(...p: Array<T>) {

    return p;
}


export function mcompose<T, R>(g: ((...args: Array<T>) => R),
                               ...fs: Array<(x: T, ...xs: Array<T>) => Either<any, T>>)
    : (seed: Either<any, T>) => Either<any, R>;
export function mcompose<T, R>(g: ((...args: Array<T>) => R),
                               ...fs: Array<(x: T, ...xs: Array<T>) => Maybe<T>>)
    : (seed: Maybe<T>) => Maybe<R>;
export function mcompose<T, R>(g: ((...args: Array<T>) => R),
                               ...fs: Array<(x: T, ...xs: Array<T>) => Either<any, T>|Maybe<T>>)
    : (seed: Either<any, T>|Maybe<T>) => Maybe<R>|Either<any, R> {

    return (seed: Maybe<T>|Either<any, T>) => {
        if (isFailure(seed)) return seed as any;

        let results = [getValue(seed)] as Array<T>;
        for (let f of reverse(fs)) {

            const res = f(first(results) as T, ...rest(results));
            if (isFailure(res)) return res as any;
            results = [getValue(res)].concat(results);
        }
        return convert(g(...results), seed) as any;
    }
}


function convert<T>(what: any, basedOn: Fallible<T>): any {

    if (!isEither(basedOn) && !isMaybe(basedOn)) throw 'illegal argument - basedOn is neither Maybe nor Either';
    return isEither(basedOn)
        ? either(what)
        : maybe(what);
}


export function mmatch<T, R>(onSuccess: (x: T) => R,
                             onFailure: () => R) {

    return (m: Maybe<T>) => {

        return isSuccess(m)
            ? onSuccess((m as any)[0])
            : onFailure();
    }
}