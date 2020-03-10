import {identity} from './core';
import {Either, Fallible, Just, Maybe, Pair} from './type';
import {isEither, isFailure, isMaybe, isSuccess} from './predicate';
import {first, rest, reverse} from './list';

export function tuplify(...fs : any[]) {

    return (s: any) => fs.map(f => f(s));
}


export function pairWith(f: any) {

    return tuplify(identity, f);
}


export function left<T>(pair: Pair<T,any>|Either<T,any>): T {

    if (pair.length !== 2) throw Error("Illegal argument: Pair/Either must have length 2");
    return pair[0] as T;
}


export function right<T>(pair: Pair<any, T>|Either<any,T>): T {

    if (pair.length !== 2) throw Error("Illegal argument: Pair/Either must have length 2");
    return pair[1] as T;
}


export function swap<S, T>([l, r]: Pair<S, T>): Pair<T, S> {

    return [r, l] as Pair<T, S>
}


export function mmap<T>(f: (x: T) => Maybe<T>) {

    return (m: Maybe<T>) => {

        return isFailure(m)
            ? []
            : f((m as any)[0]);
    }
}


export function mcompose<T, R>(g: ((...args: Array<T>) => R) = (identity as any),
                               ...fs: Array<(x: T, ...xs: Array<T>) => Maybe<T>>) {

    return (seed: Maybe<T>): Maybe<R> => {
        if (isFailure(seed)) return seed as any;

        let results = seed as Array<T>;
        for (let f of reverse(fs)) {

            const res = f(first(results) as T, ...rest(results));
            if (isFailure(res)) return res as any;
            results = [getValue(res)].concat(results);
        }
        return [g(...results)];
    }
}


export function ecompose<L, T>(g: ((...args: Array<any>) => T) = (identity as any),
                               ...fs: Array<(x: any, ...xs: Array<any>) => Either<L>>) {

    return (seed: Either<L>): Either<L, T> => {
        if (isFailure(seed)) return seed;

        let results = [(seed as any)[1]] as Array<any>;
        for (let f of reverse(fs)) {
            const res = f(first(results) as any, ...rest(results));
            if (isFailure(res)) return res as any;
            results = [getValue(res)].concat(results as any);
        }

        return [undefined, g(...results)];
    }
}


export function mmatch<T, R>(onSuccess: (x: T) => R,
                             onFailure: () => R) {

    return (m: Maybe<T>) => {

        return isSuccess(m)
            ? onSuccess((m as any)[0])
            : onFailure();
    }
}


export function mVal<T>(v: T) {

    return (..._: any) => [v] as Maybe<T>;
}


export function eVal<T>(v: T) {

    return (..._: any) => [undefined, v] as Either<T>;
}


export function toMaybe<T>(v: T): Maybe<T> {

    return [v];
}


export function toEither<T>(v: T): Either<any, T> {

    return [undefined, v];
}


export function mlift<T,R>(f: (x: T) => R) {

    return (x: T): Maybe<R> => {

        try {
            return [f(x)];
        } catch {
            return [];
        }
    }
}


export function elift<T,R>(f: (x: T) => R) {

    return (x: T): Either<any, R> => {

        try {
            return [undefined, f(x)];
        } catch (e) {
            return [e, undefined];
        }
    }
}


export function getValue<T>(x: Fallible<T>) {

    if (!isEither(x) && !isMaybe(x)) throw 'illegal argument - neither Maybe nor Either';
    if (!isSuccess(x)) throw 'illegal argument - expected success value to be present';
    return isEither(x)
        ? (x as any)[1]
        : (x as any)[0];
}


export function midentity<T>(...p: Array<T>) {

    return p;
}