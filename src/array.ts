import {
    isArray,
    isEmpty, isFunction, isNot,
    isNumber,
    isObject,
    isUndefined
} from './predicate'
import {identity} from './core'
import {Associative, Mapping, Pair, Predicate} from './type'
import {values, map_a, size} from './associative'
import {
    filter as filterColl,
    remove as removeColl,
    separate as separateColl
} from './collection'
import {Map} from './type'
import { flow, throws, val } from './composition'



export function flatMap<A,B>(as: Array<A>, f: (_: A) => Array<B>): Array<B>
export function flatMap<A,B>(f: (_: A) => Array<B>, as: Array<A>): Array<B>
export function flatMap<A,B>(f: (_: A) => Array<B>): (as: Array<A>) => Array<B>
export function flatMap<A,B>(arg, arg2?): any {

    const $ = f => (as: Array<A>): Array<B> =>
            (as.length < 1
                ? []
                : as.reduce(intoArrayWith(f as any),[])) as unknown as Array<B>

    return arg2 === undefined
        ? $(arg)
        : isFunction(arg)
            ? $(arg)(arg2)
            : $(arg2)(arg)
}


const intoArrayWith = <A>(f: (_: A) => Array<A>) =>
    (acc: Array<A>, val: A) => acc.concat(f(val))


/**
 * see https://mail.mozilla.org/pipermail/es-discuss/2012-April/022273.html
 */
export function dense(size: number) {

    return Array.apply(null, Array(size))
}


export function range(a: number, b?: number, stepSize: number = 1): number[] {

    let begin: number|undefined = undefined
    let end:   number|undefined = undefined

    if (b === undefined) {
        end = a
        begin = 0
    } else {
        begin = a
        end   = b
    }
    const numItems = (end - begin) / stepSize

    return dense(numItems)
        .map((a: any, i: number) => (begin as number) + (i * stepSize))
}


export function reduce0<T>(f: (b: T, t: T, i?: number) => T) {

    return (ts: T[]): T => {

        if (isArray(ts) && !isEmpty(ts)) {

            let acc: T = first(ts) as T
            let i = 0
            for (let a of rest(ts)) {
                acc = f(acc, a, i)
                i++
            }
            return acc

        } else {

            throw 'illegal argument in "tsfun|reduce0" - array or object expected'
        }
    }
}


export function map<A = any, B = A>(f: (_: A, i: number) => B): (as: Array<A>) => Array<B>
export function map<A = any, B = A >(f: (_: A) => B): (as: Array<A>) => Array<B>
export function map<A, B>(...args: any[]): any {

    if (args.length > 1) throw 'illegal argument in "tsfun|map"'
    return map_a(args[0])
}


// TODO allow deeper levels to get collapsed in associative, if they all are arrays. if not, then stop at the level, it cannot get further collapsed
// leftover: export function flatten<T>(as: Associative<T>): Array<T>

export function flatten<U, T extends Array<U>>(as: Array<T>): T
export function flatten<U, T extends Array<U>>(depth: 1, as: Array<T>): T
export function flatten<U, T extends Array<U>>(as: Array<T>, depth: 1): T
export function flatten<U, T extends Array<U>, K extends Array<T>>(depth: 2, as: Array<K>): T
export function flatten<U, T extends Array<U>, K extends Array<T>>(as: Array<K>, depth: 2): T
export function flatten<U, T extends Array<U>, K extends Array<T>, V extends Array<K>>(depth: 3, as: Array<V>): T
export function flatten<U, T extends Array<U>, K extends Array<T>, V extends Array<K>>(as: Array<V>, depth: 3): T
export function flatten<U, T extends Array<U>>(as: Array<T>, depth: number): T
export function flatten<U, T extends Array<U>>(depth: number, as: Array<T>): T
export function flatten<T>(as: Array<T>, depth: number): Array<unknown>
export function flatten(depth: void): <U, T extends Array<U>>(as: Array<T>) => T
export function flatten(depth: 1): <U, T extends Array<U>>(as: Array<T>) => T
export function flatten(depth: number): <T,R>(as: Array<T>) => Array<R>
export function flatten(p1: any, ...p2: any[]): any {

    if (p2.length > 1) throw 'illegal argument in "tsfun|flatten"'
    if (p2.length === 1) {
        if (!(
            (isNumber(p1) && isArray(p2[0]))
            || (isArray(p1) && isNumber(p2[0]))
        )) throw 'illegal argument in "tsfun|flatten"'
    }

    const _flatten = flatMap(identity as any) as any

    const $ = (num: number) =>
        (as: Associative) => {

            if (num < 1) throw 'illegal argument in "tsfun|flatten"'

            if (p2.length === 0 && (isNumber(p1)||isUndefined(p1)) && !isArray(as)) {
                throw 'illegal argument in "tsfun|flatten"'
            }

            return num === 1 || num === undefined || isObject(as)
                ? _flatten(values(as))
                : flatten(num - 1)(_flatten(as))
        }

    return p2.length === 0
        ? isNumber(p1)
            ? $(p1)
            : p1 === undefined
                ? $(1)
                : $(1)(p1)
        : isNumber(p1)
            ? $(p1)(p2[0])
            : $(p2[0])(p1)
}


export function filter<A>(p: (a: A, i: number) => boolean): (_: Array<A>) => Array<A>
export function filter<A>(p: (a: A) => boolean): (_: Array<A>) => Array<A>
export function filter<A>(...args: any[]): any {

    if (args.length > 1) throw 'illegal argument in "tsfun|filter"'
    return filterColl(args[0])
}


export function drop(n: number): <A>(as: Array<A>) => Array<A>
export function drop<A>(n: number, as: Array<A>): Array<A>
export function drop(n: number, p2?: any): any {

    const $ = <A>(as: any) => {

        if (!isArray(as)) throw 'illegal argument in "tsfun|drop" - array expected'

        const as_ = as as Array<A>
        return n < 1 ? as_ :
            as.slice(n)
    }

    return p2 === undefined
        ? $
        : $(p2)
}


export function take(n: number): <A>(_: Array<A>) => Array<A>
export function take<A>(n: number, p: Predicate<A>): (_: Array<A>) => Array<A>
export function take<A>(n: number, as: Array<A>): Array<A>
export function take<A>(n: number, p: Predicate<A>, as: Array<A>): Array<A>
export function take<A>(n: number, ...args): any {

    const $ = p => as => {
        if (!isArray(as)) throw 'illegal argument in "tsfun|take" - array expected'

        let items = []
        let i = 0
        while (items.length < n && i < as.length) {

            if (p(as[i])) items.push(as[i] as never)
            i++
        }
        return items
    }

    return flow(
        args.length === 2
            ? [args[0], args[1]]
            : args.length === 1 && isFunction(args[0])
                ? [args[0], undefined]
                : [val(true), args[0]],
        ([p, list]) =>
            list === undefined
                ? $(p)
                : isArray(list)
                    ? $(p)(list)
                    : throws('illegal argument in "tsfun|take" - array expexted'))
}


export function dropRight(n: number): <A>(as: Array<A>) => Array<A>
export function dropRight<A>(n: number, as: Array<A>): Array<A>
export function dropRight(n: number, as?: any): any {

    const $ = <A>(as: any): any => {

        if (!isArray(as)) throw 'illegal argument in "tsfun|dropRight" - array expected'

        return (as as Array<A>).slice(0, Math.max(0, as.length-n)) as Array<A>
    }

    return as === undefined
        ? $
        : $(as)
}


export function dropWhile<A>(predicate: Predicate<A>): Mapping<Array<A>>
export function dropWhile<A>(predicate: Predicate<A>, as: Array<A>): Array<A>
export function dropWhile<A>(predicate: any, as?: any): any {

    const $ = (as: Array<A>) => {

        const as1 = as

        let go = false
        const result = as1.reduce((acc: Array<A>, a: any) =>
            go || !predicate(a) ? (go = true, acc.concat([a])) : acc, [])

        return result
    }

    return as === undefined
        ? $
        : $(as)
}


export function dropRightWhile<A>(predicate: Predicate<A>): Mapping<Array<A>>
export function dropRightWhile<A>(predicate: Predicate<A>, as: Array<A>): Array<A>
export function dropRightWhile<A>(predicate: any, as?: any): any {

    const $ = (as: any): any => {

        const as1 = as

        let go = false
        const result = as1.reduceRight((acc: Array<A>, a: any) =>
            go || !predicate(a) ? (go = true, [a].concat(acc)) : acc, [])

        return result
    }

    return as === undefined
        ? $
        : $(as)
}


export function takeRightWhile<A>(predicate: Predicate<A>): Mapping<Array<A>>
export function takeRightWhile<A>(predicate: Predicate<A>) {

    return (as: Array<A>) => {

        const as1 = as

        let go = true
        const result = as1.reduceRight((acc: Array<A>, a: any) =>
            go && predicate(a) ? [a].concat(acc) : (go = false, acc), [])

        return result
    }
}


export function takeRight(n: number): <A>(as: Array<A>) => Array<A>
export function takeRight(n: number): <A>(as: Array<A>) => Array<A> {

    function $<A>(as: Array<A>): Array<A>
    function $(as: string): string
    function $<A>(as: Array<A>|string): Array<A>|string {

        if (isArray(as)) {

            return n < 0 ? [] :
                (as as Array<A>).reduceRight((acc: Array<A>, val, i) =>
                        (as.length - i) <= n ? [val].concat(acc) : acc
                    , [])

        } else {

            throw 'illegal argument - must be array'
        }
    }

    return $
}


export function takeWhile<A>(predicate: Predicate<A>): Mapping<Array<A>>
export function takeWhile<A>(predicate: Predicate<A>, list: Array<A>): Array<A>
export function takeWhile<A>(predicate, list?): any {

    const $ = (list: any) => {

        const as1 = list

        let go = true
        const result = as1.reduce((acc: Array<A>, a: any) =>
            go && predicate(a) ? acc.concat([a]) : (go = false, acc), [])

        return result
    }

    return list === undefined
        ? $
        : $(list)
}


export function distribute<A>(f: (a: A) => A): (as: Array<string>) => Map<Array<string>>
export function distribute<A>(f: (a: A) => string): (as: Array<A>) => Map<Array<A>>
export function distribute<A>(f: (a: A) => string, as: Array<A>): Map<Array<A>>
export function distribute<A>(as: Array<A>, f: (a: A) => string): Map<Array<A>>
export function distribute(arg, arg2?) {

    const $ = f => as =>
        as.reduce((acc, a) => {

            const r = f(a)
            if (acc[r]) acc[r].push(a)
            else acc[r] = [a]

            return acc

        }, {})

    return arg2 === undefined
        ? $(arg)
        : isFunction(arg)
            ? $(arg)(arg2)
            : $(arg2)(arg)
}


export function separate<A>(p: (a: A, i: number) => boolean): (as: Array<A>) => Pair<Array<A>>
export function separate<A,B>(f: (a: A, i: number) => B): (as: Array<A>) => Array<Pair<B, Array<A>>>
export function separate<A>(p: (a: A) => boolean): (as: Array<A>) => Pair<Array<A>>
export function separate<A>(p: (a: A, i: number) => boolean, as: Array<A>): Pair<Array<A>>
export function separate<A>(p: (a: A) => boolean, as: Array<A>): Pair<Array<A>>
export function separate<A>(as: Array<A>, p: (a: A, i: number) => boolean): Pair<Array<A>>
export function separate<A>(as: Array<A>, p: (a: A) => boolean): Pair<Array<A>>
export function separate<A>(...args): any {

    return args.length === 1
        ? separateColl(args[0])
        : isFunction(args[0])
            ? separateColl(args[0], args[1])
            : separateColl(args[1], args[0])
}


export function remove<A>(p: (a: A, i: number) => boolean): (as: Array<A>) => Array<A>
export function remove<A>(p: (a: A) => boolean): (as: Array<A>) => Array<A>
export function remove<A>(p: (a: A, i: number) => boolean, as: Array<A>): Array<A>
export function remove<A>(p: (a: A) => boolean, as: Array<A>): Array<A>
export function remove<A>(as: Array<A>, p: (a: A, i: number) => boolean): Array<A>
export function remove<A>(as: Array<A>, p: (a: A) => boolean): Array<A>
export function remove(...args): any {

    return args.length === 1
        ? removeColl(args[0])
        : isFunction(args[0])
            ? removeColl(args[0], args[1])
            : removeColl(args[1], args[0])
}


export function append<A>(...as2: Array<A>): Mapping<Array<A>>
export function append<A>(...as2: Array<A>) {

    return (as: Array<A>) => {

        if (isArray(as) && isArray(as2)) {

            return as.concat(as2 as any) as Array<A>

        } else throw 'illegal argument - in \'append\''
    }
}


export function prepend<A>(...as2: Array<A>): Mapping<Array<A>>
export function prepend<A>(...as2: Array<A>) {

    return (as: Array<A>) => {

        if (isArray(as) && isArray(as2)) {

            return as2.concat(as as any) as Array<A>

        } else throw 'illegal argument - in \'prepend\''
    }
}


export function forEach<A>(f: (_: A, i: number) => void): (as: Array<A>) => Array<A>
export function forEach<A>(f: (_: A) => void): (as: Array<A>) => Array<A>
export function forEach<A>(f) {

    return (as: any) => {

        if (isArray(as)) {

            let i = 0
            for (let item of as) {
                (f as any)(item, i)
                i++
            }
            return as as Array<A>

        } else {

            throw 'illegal argument - in \'forEach\', must be array'
        }
    }
}


export function reduce<A, B>(f: (b: B, a: A, i: number) => B, init: B): (as: Array<A>) => B
export function reduce<A, B>(f: (b: B, a: A) => B, init: B): (as: Array<A>) => B
export function reduce<T, B>(f, init) {

    return (ts: any): B => {

        if (isArray(ts)) {

            let acc = init
            let i = 0
            for (let a of ts) {
                acc = f(acc, a, i)
                i++
            }
            return acc

        } else {

            throw 'illegal argument in "tsfun|reduce" - array excpected'
        }
    }
}


/**
 * tsfun | zip
 */
//export function zip<A>(as: Array<A>): <B>(_: Array<B>) => Array<[A,B]>

export function zip<A>(f: (as: Array<A>) => A): (aas: Array<Array<A>>) => Array<A>
export function zip<A>(): (aas: Array<Array<A>>) => Array<Array<A>>
export function zip<A>(aas: Array<Array<A>>): Array<Array<A>>
export function zip<A>(f: (as: Array<A>) => A, aas: Array<Array<A>>): Array<A>
export function zip<A,B>(as: Array<A>, bs: Array<B>): Array<[A,B]>
export function zip<A,B,C>(f: (a: A, b: B) => C, as: Array<A>, bs: Array<B>): Array<C>
export function zip<A,B,C>(as: Array<A>, bs: Array<B>, cs: Array<C>): Array<[A,B,C]>
export function zip<A,B,C,D>(f: (a: A, b: B, c: C) => D, as: Array<A>, bs: Array<B>, cs: Array<C>): Array<D>
export function zip<A,B,C,D>(as: Array<A>, bs: Array<B>, cs: Array<C>, ds: Array<D>): Array<[A,B,C,D]>
export function zip<A,B,C,D,E>(f: (a: A, b: B, c: C, d: D) => E, as: Array<A>, bs: Array<B>, cs: Array<C>, ds: Array<D>): Array<E>
export function zip<A,B,C,D,E>(as: Array<A>, bs: Array<B>, cs: Array<C>, ds: Array<D>, es: Array<E>): Array<[A,B,C,D,E]>
export function zip<A>(...as: Array<Array<A>>): Array<Array<A>>
export function zip<A>(...args): any {

    function zip2<A,B>(as: Array<A>, bs: Array<B>): Array<Pair<A, B>> {

        const minimumLength = Math.min(as.length, bs.length)
        const _as = take(minimumLength)(as as any)
        const _bs = take(minimumLength)(bs as any)

        const zipped: Array<[A, B]> = []
        for (let i = 0; i < minimumLength; i++) {
            zipped.push([_as[i] as A, _bs[i] as B])
        }
        return zipped
    }


    function $$(f, aas, spread = true): any {

        return (reduce0(zip2 as any) as any)(aas)
                .map(flatten(aas.length-1))
                .map(_ => spread ? f.apply(null, _) : f(_))
    }

    const $ = aas => {

        const zipped: any = []
        for (let i = 0; i < Math.min(...aas.map(size)); i++) {
            const took: any = []
            for (let j = 0; j < aas.length; j++) took.push(aas[j][i])
            zipped.push(took)
        }
        return zipped
    }


    return args.length === 0
        ? aas => $(aas)
        : args.length > 1 && isFunction(args[0])
            ? args.length === 2
                ? $$(args[0], drop(1)(args)[0], false)
                : $$(args[0], drop(1)(args))
            : args.length === 1
                ? isFunction(args[0])
                    ? aas => $$(args[0], aas, false)
                    : $(args[0])
                : $(args)
}


export const takeUntil = <A>(predicate: Predicate<A>) =>
    (as: Array<A>) =>
        (found => found ?
                takeWhile(isNot(predicate))(as).concat([found])
                : as
        )(as.find(predicate))


export function reverse<A>(as: Array<A>): Array<A> {

    if (isArray(as)) {

        return (as as Array<A>).reduce((acc: Array<A>, a) => [a].concat(acc), [])

    } else {

        throw 'illegal argument - must be array'
    }
}


export function first<T>(as: Array<T>): T|undefined {

    return as.length === 0 ? undefined : as[0]
}


export function rest<T>(as: Array<T>): Array<T> {

    return drop(1)(as as any)
}


export function last<T>(as: Array<T>): T|undefined {

    return as.length === 0
        ? undefined
        : as[as.length-1]
}
