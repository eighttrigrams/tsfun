import {Predicate, Map, Associative, Mapping, Key, Pair} from './type'
import {isArray, isAssociative, isDefined, isFunction, isObject} from './predicate'
import {range, zip} from './array'
import { throwIllegalArgs } from './core'
import { cond } from './composition'

export type Filter<T = any> = Mapping<Associative<T>>

// Written with Thomas Kleinke
// TODO see to, rename to get again
// export function to_a(i: number): <T>(as: Array<T>) => T|undefined



/**
 * tsfun | assoc
 *
 * Takes an Associative and changes one element of it.
 *
 * ```
 * assoc('b', (x: number) => x + 1, {a: 4, b: 7}
 * {a: 4, b: 8}
 * assoc('b', 8, {a: 4, b: 7}
 * {a: 4, b: 8}
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/assoc.spec.ts
 */
export function assoc<T,V>(key: string, v: Mapping<T,V>, m: Map<T>): Map<T|V>
export function assoc<T,V>(key: string, v: V, m: Map<T>): Map<T|V>
export function assoc<T,V>(key: number, v: Mapping<T,V>, m: Array<T>): Array<T|V>
export function assoc<T,V>(key: number, v: V, m: Array<T>): Array<T|V>

export function assoc<A,B>(key: string, f: Mapping<A,B>): (m: Map<A>) => Map<A|B>
export function assoc<B>(key: string, f: B): <A>(m: Map<A>) => Map<A|B>
export function assoc<A,B>(key: number, f: Mapping<A,B>): (m: Array<A>) => Array<A|B>
export function assoc<B>(key: number, f: B): <A>(m: Array<A>) => Array<A|B>

export function assoc(key, arg, arg2?): any {

    const $ = f => asc => {

        const newStruct = copy(asc);
        (newStruct as any)[key] = isFunction(f) ? f((newStruct as any)[key]) : f
        return newStruct
    }

    return arg2 === undefined
        ? $(arg)
        : $(arg)(arg2)
}


/**
 * tsfun | lookup
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/lookup.spec.ts
 */
export function lookup<T>(struct: Map<T>, alternative: T): (targetId: string) => T;
export function lookup<T>(struct: Map<T>): (targetId: string) => T|undefined;
export function lookup<A>(struct: Array<A>, alternative: A): (targetId: number) => A;
export function lookup<A>(struct: Array<A>): (targetId: number) => A|undefined;
export function lookup(struct, alternative?) {

    return !isAssociative(struct)
        ? throwIllegalArgs('lookup', 'Associative', struct)
        : targetId => {
            const result = (struct as any)[targetId]
            return result !== undefined ? result : alternative
        }
}


/**
 * tsfun | keysValues
 *
 * ```
 * >> keysValues({a: 3, b: 4})
 * [['a', 3],['b', 4]]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/keysValues.spec.ts
 */
export function keysValues<T>(o: T):
    T extends Array<infer M>
    ? Array<[number, M]>
    : T extends Map<infer M>
    ? Array<[string, M]>
    : never
export function keysValues(a) {

    return !isAssociative(a)
        ? throwIllegalArgs('keysValues', 'Associative', a)
        : zip(keys(a), Object.values(a))
}


/**
 * tsfun | keys
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/keys.spec.ts
 */
export function keys<T>(o: T):
    T extends Array<any>
    ? Array<number>
    : T extends Map<any>
    ? Array<string>
    : never
export function keys(t) {

    return isArray(t)
        ? range(t.length)
        : isObject(t)
        ? Object.keys(t)
        : throwIllegalArgs('keys', 'Associative', t)
}


/**
 * tsfun | values
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/values.spec.ts
 */
export function values<T>(o: T):
    T extends Array<infer M>
    ? M[]
    : T extends Map<infer M>
    ? Array<M>
    : never
export function values(t) {

    return isArray(t)
        ? t as Array<any>
        : Object.values(t)
}


/**
 * tsfun | map
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/map.spec.ts
 *
 * ```
 * >> map(_ => 2 * _)([3, 7])
 * [6, 14]
 * >> map(_ => 2 * _)({a: 3, b: 7})
 * {a: 6, b: 14}
 * ```
 */
export function map<A = any, B = A>(f: (_: A, i?: Key) => B):
    <T>(as: T) =>
    T extends Array<A extends (infer C) ? C : never>
    ? Array<B>
    : T extends Map<A extends (infer C) ? C : never>
    ? Map<B>
    : T extends Array<any>
    ? Array<void> // signals mismatch between A and C
    : T extends Map<any>
    ? Array<void> // signals mismatch between A and C
    : never
/**
 * >> map(_ => 2 * _, [3, 7])
 * [6, 14]
 * >> map(_ => 2 * _, {a: 3, b: 7})
 * {a: 6, b: 14}
 */
export function map<A = any, B = A>(f: (_: A, i: number) => B): (as: Array<A>) => Array<B>
export function map<A = any, B = A>(f: (_: A, key: string) => B): (as: Map<A>) => Map<B>
export function map<A = any, B = A>(f: (_: A, i: number) => B, as: Array<A>): Array<B>
export function map<A = any, B = A>(f: (_: A, i: string) => B, as: {[prop: string]: A}): Map<B>
/**
 * >> map([3, 7], _ => 2 * _)
 * [6, 14]
 * >> map({a: 3, b: 7}, _ => 2 * _)
 * {a: 6, b: 14}
 */
export function map<A = any, B = A>(as: Array<A>, f: (_: A, i: number) => B): Array<B>
export function map<A = any, B = A>(as: {[prop: string]: A}, f: (_: A, i: string) => B): Map<B>
export function map<A, B>(first, second?) {

    const $ = f => as => {
        if (!isAssociative(as)) throwIllegalArgs('map', 'Associative', as)

        if (isArray(as)) return as.map(f)
        else {
            const result = {}
            for (let key of Object.keys(as)) {
                result[key] = f(as[key], key)
            }
            return result
        }
    }

    return second === undefined
        ? !isFunction(first)
            ? throwIllegalArgs('map', 'Function', first)
            : $(first)
        : isFunction(first) && isAssociative(second)
        ? $(first)(second)
        : isAssociative(first) && isFunction(second)
        ? $(second)(first)
        : throwIllegalArgs('map', 'Associative and Function', JSON.stringify(first) + ':' + JSON.stringify(second))
}


class Stop {
    public value;
    constructor(value) { this.value = value }
}

export function stop(value) { throw new Stop(value) }


/**
 * tsfun | reduce
 *
 * ```
 * >> reduce((b: number, a: number, i: number) => b + a + i, 0)([1, 5, 6])
 * 15
 * >> reduce((b: number, a: number, k_: string) => b + a, 0)({a: 1, b: 5, c: 6}))
 * 12
 *
 * // In combination with map pass a function to construct empty structures
 * >> map([['a'], ['b']], reduce(f, () => ({} as Map<true>)))
 * [{a: true}, {b: true}]
 * // or do it like this
 * >> map([['a'], ['b']], _ => reduce(f, {})(_))
 * [{a: true}, {b: true}]
 * ```
 *
 * See examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/reduce.spec.ts
 */
export function reduce<A, B>(f: (b: B, a: A) => B, init: B|(() => B)): (as: Array<A>|Map<A>) => B
export function reduce<A, B>(f: (b: B, a: A, i: number) => B, init: B|(() => B)): (as: Array<A>) => B
export function reduce<A, B>(f: (b: B, a: A, k: string) => B, init: B|(() => B)): (as: Map<A>) => B
/**
 * ```
 * >> reduce([1, 5, 6], (b: number, a: number) => b + a, 0))
 * 12
 * ```
 *
 * See examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/reduce.spec.ts
 */
export function reduce<A, B>(as: Array<A>, f: (b: B, a: A, i: number) => B, init: B): B
export function reduce<A, B>(as: Array<A>, f: (b: B, a: A) => B, init: B): B
export function reduce<A, B>(as: Map<A>, f: (b: B, a: A, k: string) => B, init: B): B
export function reduce<A, B>(as: Map<A>, f: (b: B, a: A) => B, init: B): B
export function reduce<T, B>(...args /* do it like this to also capture a 3rd element if it is passed as undefined */): any {

    const $ = (f, init) => ts => {
        if (!isAssociative(ts)) throwIllegalArgs('reduce', 'Associative', ts)

        let acc = isFunction(init) ? init() : init
        try {
            for (let [k,v] of keysValues(ts)) {
                acc = f(acc, v, k)
            }
        } catch (e) {
            if (e instanceof Stop) acc = e.value
            else throw e
        }
        return acc
    }

    const [ts, f, init] = args.length === 3
        ? [args[0], args[1], args[2]]
        : [undefined, args[0], args[1]]

    if (!isFunction(f)) throwIllegalArgs('reduce', 'Function', f)
    if (ts && isFunction(init)) throwIllegalArgs('reduce', 'not a function when used a single argument list', init)

    return ts
        ? $(f, init)(ts)
        : $(f, init)
 }


/**
 * tsfun | forEach
 *
 * ```
 * let acc = 1
 * const items = forEach([2, 4, 3], item => (acc += item))
 * expect(items).toEqual([2, 4, 3])
 * expect(acc).toEqual(10)
 *
 * let acc = 1
 * const items = forEach({a: 2, b: 4, c: 3}, item => (acc += item))
 * expect(items).toEqual({a: 2, b: 4, c: 3})
 * expect(acc).toEqual(10)
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/for_each.spec.ts
 */
export function forEach<A>(as: Array<A>, f: (_: A) => void): Array<A>
export function forEach<A>(as: Array<A>, f: (_: A, i: number) => void): Array<A>
export function forEach<A>(as: Map<A>, f: (_: A, k: string) => void): Map<A>
export function forEach<A>(as: Map<A>, f: (_: A, k: string) => void): Map<A>
/**
 * tsfun | forEach
 *
 * ```
 * let acc = 1
 * const items = forEach([2, 4, 3])((item: number) => (acc += item))
 * expect(items).toEqual([2, 4, 3])
 * expect(acc).toEqual(10)
 *
 * let acc = 1
 * const items = forEach({a: 2, b: 4, c: 3})((item: number) => (acc += item))
 * expect(items).toEqual({a: 2, b: 4, c: 3})
 * expect(acc).toEqual(10)
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/for_each.spec.ts
 */
export function forEach<A = any>(f: (_: A, i?: Key) => void):
    <T>(as: T) =>
        T extends Array<A extends (infer C) ? C : never>
        ? Array<A>
        : T extends Map<A extends (infer C) ? C : never>
        ? Map<A>
        : T extends Array<any>
        ? Array<void> // signal mismatch between A and C
        : T extends Map<any>
        ? Array<void> // signal mismatch between A and C
        : never // on illegal argument for as

export function forEach(arg, arg2?) {

    const $ = f => as => {
        if (!isAssociative(as)) throwIllegalArgs('forEach', 'Associative', as)

        let i = 0
        for (let [k,v] of keysValues(as)) {
            f(v, k)
            i++
        }
        return as
    }

    arg2 === undefined
        ? !isFunction(arg)
            ? throwIllegalArgs('forEach', 'function', arg)
            : 0
        : !isFunction(arg2)
            ? throwIllegalArgs('forEach', 'function', arg2)
            : !isAssociative(arg)
                ? throwIllegalArgs('forEach', 'Associative', arg)
                : 0

    return arg2
        ? $(arg2)(arg)
        : $(arg)
}


/**
 * tsfun | filter
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/filter.spec.ts
 */
export function filter<A = any>(f: (_: A, i?: Key) => boolean):
    <T>(as: T) =>
        T extends Array<A extends (infer C) ? C : never>
        ? Array<A>
        : T extends Map<A extends (infer C) ? C : never>
        ? Map<A>
        : T extends Array<any>
        ? Array<A> // fallback on mismatch between A and C
        : T extends Map<any>
        ? Array<A> // fallback on mismatch between A and C
        : never // on illegal argument for as

export function filter<A>(p: (a: A, i?: number|string) => boolean): (_: Associative<A>) => Associative<A>
export function filter<A>(p: (a: A, i: number) => boolean, as: Array<A>): Array<A>
export function filter<A>(p: (a: A) => boolean, as: Array<A>): Array<A>
export function filter<A>(p: (a: A, i: string) => boolean, as: Map<A>): Map<A>
export function filter<A>(p: (a: A) => boolean, as: Map<A>): Map<A>

export function filter<A>(as: Array<A>, p: (a: A, i: number) => boolean): Array<A>
export function filter<A>(as: Array<A>, p: (a: A) => boolean): Array<A>
export function filter<A>(as: Map<A>, p: (a: A, i: string) => boolean): Map<A>
export function filter<A>(as: Map<A>, p: (a: A) => boolean): Map<A>
export function filter(...args): any {

    const $ = p => cond(
        isAssociative,
        $filter(p),
        as => throwIllegalArgs('filter','array or object', as)) // TODO make curryLast

    return !any(isFunction)(args) // TODO make one arg list version
        ? throwIllegalArgs('filter', 'at least one function', args)
        : args.length === 1
        ? $(args[0])
        : isFunction(args[0])
        ? $(args[0])(args[1])
        : $(args[1])(args[0])
}


/**
 * tsfun | remove
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/remove.spec.ts
 */
export function remove<A = any>(f: (_: A, i?: Key) => boolean):
    <T>(as: T) =>
        T extends Array<A extends (infer C) ? C : never>
        ? Array<A>
        : T extends Map<A extends (infer C) ? C : never>
        ? Map<A>
        : T extends Array<any>
        ? Array<A> // fallback on mismatch between A and C
        : T extends Map<any>
        ? Array<A> // fallback on mismatch between A and C
        : never // on illegal argument for as

export function remove<A>(p: (a: A, i: number) => boolean, as: Array<A>): Array<A>
export function remove<A>(p: (a: A) => boolean, as: Array<A>): Array<A>
export function remove<A>(as: Array<A>, p: (a: A, i: number) => boolean): Array<A>
export function remove<A>(as: Array<A>, p: (a: A) => boolean): Array<A>

export function remove<A>(p: (a: A, k: string) => boolean, as: Map<A>): Map<A>
export function remove<A>(p: (a: A) => boolean, as: Map<A>): Map<A>
export function remove<A>(as: Map<A>, p: (a: A, k: string) => boolean): Map<A>
export function remove<A>(as: Map<A>, p: (a: A) => boolean): Map<A>

export function remove(...args): any {

    return args.length === 1
        ? $remove(args[0])
        : isFunction(args[0])
            ? $remove(args[0], args[1])
            : $remove(args[1], args[0])
}


/**
 * tsfun | copy
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/copy.spec.ts
 */
export function copy<T>(struct: Array<T>): Array<T>
export function copy<T>(struct: Map<T>): Map<T>
export function copy(s) {

    return isArray(s)
        ? [...s]
        // : isObject(s)
        : {...s}
        // : throwIllegalArgs('copy', 'Associative', s) TODO enable
}


/**
 * tsfun | count
 *
 * ```
 * >> count(gt(2), [3, 2, 7])
 * 2
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/count.spec.ts
 */
export function count<A>(p: Predicate<A>): {
    (as: Array<A>): number
    (os: Map<A>): number
}
export function count<A>(p: Predicate<A>, as: Array<A>|Map<A>|string): number
export function count<A>(p: Predicate<A>, as?) {
    const $ = as => size($filter(p)(as))
    return as === undefined
        ? $
        : $(as)
}


/**
 * tsfun | all
 *
 * ```
 * >> all(gt(3))([4, 5, 6])
 * true
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/all.spec.ts
 */
export function all<T>(p: Predicate<T>) {
    if (!isFunction(p)) throwIllegalArgs('any', 'Predicate', p)
    return (as: Array<T>|Map<T>): boolean => {
        if (!isAssociative(as)) throwIllegalArgs('any', 'Associative', as)
        return (values(as as any) as any).every(p)
    }
}


/**
 * tsfun | any
 *
 * ```
 * >> any(gt(3))([4, 3])
 * true
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/any.spec.ts
 */
export function any<T>(p: Predicate<T>) {
    if (!isFunction(p)) throwIllegalArgs('any', 'Predicate', p)
    return (as: Array<T>|Map<T>): boolean => {
        if (!isAssociative(as)) throwIllegalArgs('any', 'Associative', as)
        return (values(as as any) as any).some(p)
    }
}


/**
 * tsfun | prune
 *
 * ```
 * >> prune({a: 1, b: undefined})
 * {a: 1}
 * >> prune([1, undefined, 2])
 * [1, 2]
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/prune.spec.ts
 */
export function prune<T>(o: Map<T>): Map<T>
export function prune<A>(as: Array<A>): Array<A>
export function prune<T>(ts: Array<T>|Map<T>) {
    if (!isAssociative(ts)) throwIllegalArgs('prune', 'Associative', ts)
    return $filter(isDefined)(ts as any)
}


/**
 * tsfun | indices
 *
 * Curried version
 *
 * ```
 * >> indices(is('3'))(['1', '3', '7', '1'])
 * [1]
 * >> indices(gt(2))({a: 3, b: 1, c: 7})
 * ['a', 'c']
 * ```
 *
 * More examples
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/indices.spec.ts
 */
export function indices<A>(p: Predicate<A>): {
    (as: Array<A>): number[]
    (as: Map<A>): string[]
}
/**
 * tsfun | indices
 *
 * Non-curried version
 *
 * ```
 * >> indices(is('3'), ['1', '3', '7', '1'])
 * [1]
 * >> indices(gt(2), {a: 3, b: 1, c: 7})
 * ['a', 'c']
 * ```
 *
 * More examples
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/indices.spec.ts
 */
export function indices<A>(p: Predicate<A>, as: Array<A>): number[]
export function indices<A>(p: Predicate<A>, as: Map<A>): string[]
export function indices<A>(p: Predicate<A>, as?: any): any {

    if (!isFunction(p)) throwIllegalArgs('indices', 'Predicate', p)

    const $ = as => {
        if (!isAssociative(as)) throwIllegalArgs('indices', 'Associative', as)

        return $reduce_a(
            (indices: number[], a: A, i: number|string) => p(a)
                ? indices.concat([i] as any)
                : indices
            , [])(as)
    }

    return as === undefined
        ? $
        : $(as)
}


/**
 * tsfun | size
 * https://github.com/eighttrigrams/tsfun/blob/master/test/associative/size.spec.ts
 */
export function size<A>(as: Array<A>): number
export function size<T>(o: Map<T>): number
export function size<T>(o: Array<T>|Map<T>): number {

    return (isArray(o)
        ? o.length
        : keys(o as any).length) as number
}


/**
 * Library internal
 */
export function $filter<A>(...args): any { // TODO always call with single param list

    const $ = p => as => {

        if (isArray(as)) {

            const as1 = []
            let i = 0
            for (let a of as) {
                if (p(a, i)) as1.push(a as never)
                i++
            }

            return as1 as Array<A>
        }
        else if (isObject(as)) {

            const o = as as Map<A>

            const o1: any = {}
            let i = 0
            for (let k of keys(o)) {
                if (p(o[k], k)) o1[k] = o[k]
                i++
            }

            return o1 as Map<A>

        } else throw 'FATAL'
    }

    return args.length === 1
        ? $(args[0])
        : isFunction(args[0])
            ? $(args[0])(args[1])
            : $(args[1])(args[0])
}


export function $remove<A>(p: (a: A, i?: number|string) => boolean): (as: Associative) => Associative
export function $remove<A>(p: (a: A, i: number) => boolean, as: Array<A>): Array<A>
export function $remove<A>(p: (a: A) => boolean, as: Array<A>): Array<A>
export function $remove<A>(as: Array<A>, p: (a: A, i: number) => boolean): Array<A>
export function $remove<A>(as: Array<A>, p: (a: A) => boolean): Array<A>
export function $remove<A>(p: (a: A, i: number) => boolean, as: string): string
export function $remove<A>(p: (a: A) => boolean, as: string): string
export function $remove<A>(as: string, p: (a: A, i: number) => boolean): string
export function $remove<A>(as: string, p: (a: A) => boolean): string
export function $remove<A>(p: (a: A, i: string) => boolean, as: Map<A>): Map<A>
export function $remove<A>(p: (a: A) => boolean, as: Map<A>): Map<A>
export function $remove<A>(as: Map<A>, p: (a: A, i: string) => boolean): Map<A>
export function $remove<A>(as: Map<A>, p: (a: A) => boolean): Map<A>
export function $remove<A>(...args): any {

    const inner = p => $filter((a: any, i: number|string) => !p(a, i))

    return args.length === 1
        ? inner(args[0])
        : isFunction(args[0])
            ? inner(args[0])(args[1])
            : inner(args[1])(args[0]) as any
}


/* internal */ export const mapProperties = <A, B>(f: (_: A) => B) =>
(keys: Array<number|string>, o: Map<A>): Map<B> =>
keys.reduce(mapPropertiesReducer(f)(o), {})


const mapPropertiesReducer = <A, B>(f: (_: A) => B) =>
(o: any) => (acc: any, val: string) => (acc[val] = f(o[val]), acc)

/**
 * Library internal
 */
export function $reduce_a(...args): any {

    const inner = (f, init) => (ts: any) => {

        if (isArray(ts)) {

            let acc = init;
            let i = 0;
            for (let a of ts) {
                acc = f(acc, a, i)
                i++
            }
            return acc

        } else if (isObject(ts)) {

            const o = ts

            let acc = init
            for (let k of keys(ts)) {
                acc = f(acc, o[k], k)
            }
            return acc

        } else {

            throwIllegalArgs('$reduce_a', 'array or object', ts)
        }
    }

    return args.length === 2
        ? inner(args[0], args[1])
        : isFunction(args[0])
            ? inner(args[0], args[1])(args[2])
            : inner(args[1], args[2])(args[0])
}
