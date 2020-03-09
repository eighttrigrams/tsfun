import {identity} from './core';
import {Either, Maybe, Pair} from './type';
import {isFailure} from './predicate';
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


export function mflow<T>(g: (...args: Array<T>) => T, seed: T,
                         ...fs: Array<(x: T, ...xs: Array<T>) => Maybe<T>>): Maybe<T> {

    let results = [seed];
    for (let f of fs) {
        const res = f(first(results) as T, ...rest(results));
        if (isFailure(res)) return [];
        results = [(first(res) as T)].concat(results);
    }
    return [g(...rest(reverse(results)))];
}


export function mval<T>(v: T) {

    return (..._: any) => [v] as Maybe<T>;
}