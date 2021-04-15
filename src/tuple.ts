import {identity, throwIllegalArgs} from './core'
import {Either, Err, Failure, Fallible, Just, Maybe, Nothing, Ok, Pair, Singleton, Success} from './type'
import {isArray, isEither, isMaybe, isOk} from './predicate'


// to be used with on
export const L = 0
export const R = 1



/**
 * tsfun | tuplify
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/tuplify.spec.ts
 */
export function tuplify<S = any, T = S>(...fs : Array<(s: S) => T>) {

    return (s: S) => fs.map(f => f(s)) as Array<T>
}


/**
 * tsfun | pairWith
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/pair_with.spec.ts
 */
export function pairWith<S = any, T = S>(f: (s: S) => T) {

    return tuplify(identity as any, f) as (s: S) => Pair<S, T>
}


/**
 * tsfun | left
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/left.spec.ts
 */
export function left<T = any>(pair: Pair<T, any>|Either<T>): T {

    if (pair.length !== 2) throwIllegalArgs('left', 'Pair/Either of length 2', pair)
    return pair[0] as T
}



/**
 * tsfun | right
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/right.spec.ts
 */
export function right<T>(pair: Pair<any, T>|Either<any,T>): T {

    if (pair.length !== 2) throwIllegalArgs('right', 'Pair/Either of length 2', pair)
    return pair[1] as T
}


/**
 * tsfun | value
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/value.spec.ts
 */
export function value<T = any>(s: Singleton<T>): T {

    if (s.length !== 1) throwIllegalArgs('value', 'singleton array of length 1', value)
    return s[0]
}


/**
 * tsfun | swap
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/swap.spec.ts
 */
export function swap<S, T>([l, r]: Pair<S, T>): Pair<T, S> {

    return [r, l] as Pair<T, S>
}


/**
 * tsfun | just
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/just.spec.ts
 */
export function just<T = any>(v: T): Just<T> {

    return [v]
}


/**
 * tsfun | nothing
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/nothing.spec.ts
 */
export function nothing(): Nothing {

    return []
}



/**
 * tsfun | singleton
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/singleton.spec.ts
 */
export function singleton<T = any>(v: T): Singleton<T> {

    return [v]
}



/**
 * tsfun | pair
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/pair.spec.ts
 */
export function pair<L = any, R = L>(l: L, r: R): Pair<L, R> {

    return [l, r]
}



/**
 * tsfun | success
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/success.spec.ts
 */
export function success<L = string, R = any>(v: R): Either<L, R> {

    return [undefined, v]
}



/**
 * tsfun | failure
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/failure.spec.ts
 */
export function failure<L = string, R = any>(v: L): Either<L, R> {

    return [v, undefined]
}


/**
 * tsfun | liftM
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/lift_m.spec.ts
 */
export function liftM<T, R>(f: (x: T) => R): (x: T) => Maybe<R>
export function liftM<T, R>(f: (...x: T[]) => R): (...x: T[]) => Maybe<R>
export function liftM<T,R>(f: (x: T) => R) {

    return (...x: T[]): Maybe<R> => {

        try {
            return [isArray(x) ? (f as any)(...x) : (f as any)(x)]
        } catch {
            return []
        }
    }
}


/**
 * tsfun | liftE
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/lift_e.spec.ts
 */
export function liftE<T,R>(f: (x: T) => R): (x: T) => Either<any, R>
export function liftE<T,R>(f: (...x: T[]) => R): (...x: T[]) => Either<any, R>
export function liftE<T,R>(f: (...x: T[]) => R) {

    return (...x: Array<T>): Either<any, R> => {

        try {
            return [undefined, f(...x)]
        } catch (e) {
            return [e, undefined]
        }
    }
}


/**
 * tsfun | ok
 *
 * ```
 * >> ok([3])
 * 3
 * >> ok([undefined, 3])
 * 3
 * >> ok([])
 * throws error
 * >> ok([3, undefined])
 * throws error
 * ```
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/ok.spec.ts
 */
export function ok<T>(x: Ok<T>): T {

    if (!isEither(x) && !isMaybe(x)) throwIllegalArgs('ok', 'Fallible(Maybe|Either)', x)
    if (!isOk(x)) throwIllegalArgs('ok', 'success value to be present', x)
    return isEither(x)
        ? (x as any)[1]
        : (x as any)[0]
}


/**
 * tsfun | err
 *
 * ```
 * >> err([3, undefined])
 * 3
 * >> err([])
 * undefined
 * >> err([3])
 * throws error
 * >> err([undefined 3])
 * throws error
 * ```
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/tuple/ok.spec.ts
 */
export function err<T>(x: Failure<T>): T
export function err(x: Nothing): undefined
export function err<T>(x: Err<T>): T|undefined {

    if (!isEither(x) && !isMaybe(x)) throwIllegalArgs('ok', 'Fallible(Maybe|Either)', x)
    if (isOk(x)) throwIllegalArgs('ok', 'success value not to be present', x)
    return isEither(x)
        ? (x as any)[0]
        : undefined
}
