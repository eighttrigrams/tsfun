import {identity} from './core';
import {Either, Fallible, Maybe, Pair, Singleton} from './type';
import {isArray, isEither, isMaybe, isSuccess} from './predicate';


export function tuplify<S = any, T = S>(...fs : Array<(s: S) => T>) {

    return (s: S) => fs.map(f => f(s)) as Array<T>;
}


export function pairWith<S = any, T = S>(f: (s: S) => T) {

    return tuplify(identity as any, f) as (s: S) => Pair<S, T>;
}


export function left<T = any>(pair: Pair<T>|Either<T>): T {

    if (pair.length !== 2) throw 'illegal argument - Pair/Either must have length 2';
    return pair[0] as T;
}


export function right<T>(pair: Pair<any, T>|Either<any,T>): T {

    if (pair.length !== 2) throw 'illegal argument - Pair/Either must have length 2';
    return pair[1] as T;
}


export function value<T = any>(s: Singleton<T>): T {

    if (s.length !== 1) throw 'illegal argument - singleton array must have length 1';
    return s[0];
}


export function swap<S, T>([l, r]: Pair<S, T>): Pair<T, S> {

    return [r, l] as Pair<T, S>
}


export function just<T = any>(v: T): Maybe<T> {

    return [v];
}


export function nothing<T = any>(): Maybe<T> {

    return [];
}


export function singleton<T = any>(v: T): Singleton<T> {

    return [v];
}


export function pair<L = any, R = L>(l: L, r: R): Pair<L, R> {

    return [l, r];
}


export function success<L = string, R = any>(v: R): Either<L, R> {

    return [undefined, v];
}


export function failure<L = string, R = any>(v: L): Either<L, R> {

    return [v, undefined];
}


export function liftM<T, R>(f: (x: T) => R): (x: T) => Maybe<R>;
export function liftM<T, R>(f: (...x: T[]) => R): (...x: T[]) => Maybe<R>;
export function liftM<T,R>(f: (x: T) => R) {

    return (...x: T[]): Maybe<R> => {

        try {
            return [isArray(x) ? (f as any)(...x) : (f as any)(x)];
        } catch {
            return [];
        }
    }
}


export function liftE<T,R>(f: (x: T) => R): (x: T) => Either<any, R>;
export function liftE<T,R>(f: (...x: T[]) => R): (...x: T[]) => Either<any, R>;
export function liftE<T,R>(f: (...x: T[]) => R) {

    return (...x: Array<T>): Either<any, R> => {

        try {
            return [undefined, f(...x)];
        } catch (e) {
            return [e, undefined];
        }
    }
}


export function getSuccess<T>(x: Fallible<T>) {

    if (!isEither(x) && !isMaybe(x)) throw 'illegal argument - neither Maybe nor Either';
    if (!isSuccess(x)) throw 'illegal argument - expected success value to be present';
    return isEither(x)
        ? (x as any)[1]
        : (x as any)[0];
}