import {identity} from './core';
import {Either, Maybe, Pair} from './type';
import {isFailure, isSuccess} from './predicate';
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

        if (isFailure(seed)) return [];
        let results = seed as Array<T>;
        for (let f of reverse(fs)) {
            const res = f(first(results) as T, ...rest(results));
            if (isFailure(res)) return [];
            results = [(first(res) as T)].concat(results);
        }
        return [g(...results)];
    }
}


export function eflow<T, L, R, U = Either<L, R>>(g: ((...args: Array<T>) => R) = (identity as any),
                                                 onSuccess?: (x: R) => U,
                                                 onFailure?: () => U) {

    return (seed: Either<L, R>, ...fs: Array<(x: T, ...xs: Array<T>) => Either<L, R>>): U => {

        if (isFailure(seed)) return (onFailure ? onFailure() : seed) as U;
        let results = [seed[1] as any] as Array<T>;
        for (let f of fs) {
            const res = f(first(results) as T, ...rest(results));
            if (isFailure(res)) return (onFailure ? onFailure() : res) as U;
            results = [((res as any)[1] as T)].concat(results);
        }
        return (onSuccess
            ? onSuccess(g(...rest(reverse(results))))
            : [undefined, g(...rest(reverse(results)))]) as U;
    }
}


export function mmatch<T, R>(m: Maybe<T>,
                             onSuccess: (x: T) => R,
                             onFailure: () => R) {

    return isSuccess(m)
        ? onSuccess((m as any)[0])
        : onFailure();
}


export function mval<T>(v: T) {

    return (..._: any) => [v] as Maybe<T>;
}


export function toMaybe<T>(v: T): Maybe<T> {

    return [v];
}


export function mlift<T,R>(f: (x: T) => R) {

    return (x: T): Maybe<R> => {

        return [f(x)];
    }
}