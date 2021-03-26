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
 * tsfun | update_a
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/update_a.spec.ts
 */
export function update_a<T,V>(key: string, v: Mapping<T,V>, m: Map<T>): Map<T|V>
// export function update_a<T,V,K>(key: string, v: Mapping<K,V>, m: Map<T>): Map<void> // TODO implement
export function update_a<T,V>(key: string, v: V, m: Map<T>): Map<T|V>
export function update_a<T,V>(key: number, v: Mapping<T,V>, m: Array<T>): Array<T|V>
export function update_a<T,V>(key: number, v: V, m: Array<T>): Array<T|V>

export function update_a<A,B>(key: string, f: Mapping<A,B>): (m: Map<A>) => Map<A|B>
export function update_a<B>(key: string, f: B): <A>(m: Map<A>) => Map<A|B>
export function update_a<A,B>(key: number, f: Mapping<A,B>): (m: Array<A>) => Array<A|B>
export function update_a<B>(key: number, f: B): <A>(m: Array<A>) => Array<A|B>

export function update_a(key, arg, arg2?): any {

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
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/lookup.spec.ts
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
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/keysValues.spec.ts
 */
export function keysValues<T>(o: T):
    T extends Array<infer M>
    ? Array<[number, M]>
    : T extends Map<infer M>
    ? Array<[string, M]>
    : never
export function keysValues<T>(a) {

    return !isAssociative(a)
        ? throwIllegalArgs('keysValues', 'Associative', a)
        : zip(keys(a) as any, Object.values(a) as any) as any
}


/**
 * tsfun | keys
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/keys.spec.ts
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
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/values.spec.ts
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
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/map.spec.ts
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
export function map<A, B>(first: any, ...rest: any[]): any {

    if (rest.length > 1) {
        throw 'illegal argument - in \'map\': first argument list can have at most two arguments'
    }
    if (rest.length === 0 && !isFunction(first)) {
        throw 'illegal argument - in \'map\': argument must be function in one element argument list'
    }
    if (rest.length === 1) {
        if (!
            (isFunction(first) && isAssociative(rest[0])
            || isFunction(rest[0]) && isAssociative(first)))
        throw 'illegal argument - in \'map\': in ' +
        'two element argument list one must be an associative collection and one a function'
    }

    const mappingFunction = isFunction(first)
        ? first
        : rest[0] // typing and guards prevent this to be out of bounds

    const $ = (associativeColl: any): any => {

        if (rest.length === 0 && !isAssociative(associativeColl)) {
            throwIllegalArgs('map', 'associative collection', associativeColl)
        }

        if (isArray(associativeColl)) return (associativeColl as Array<A>).map(mappingFunction) as Array<B>
        else {
            const result: Map<B> = {}
            for (let key of Object.keys(associativeColl)) {
                result[key] = mappingFunction(associativeColl[key], key)
            }
            return result
        }
    }

    return rest.length === 0
        ? $
        : $(
            isAssociative(rest[0])
                ? rest[0]
                : first
        )
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
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/for_each.spec.ts
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
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/for_each.spec.ts
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
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/filter.spec.ts
 */
export function filter<A = any>(f: (_: A, i?: Key) => boolean):
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
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/remove.spec.ts
 */
export function remove<A = any>(f: (_: A, i?: Key) => boolean):
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
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/copy.spec.ts
 */
export function copy<T>(struct: Array<T>): Array<T>
export function copy<T>(struct: Map<T>): Map<T>
export function copy(struct) {

    return isArray(struct)
        ? [...struct]
        : {...struct}
}


/**
 * tsfun | count
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/count.spec.ts
 */
export function count<A>(p: Predicate<A>): {
    (as: Array<A>): number
    (os: Map<A>): number
}
export function count<A>(p: Predicate<A>, as: Array<A>|Map<A>|string): number
export function count<A>(p: Predicate<A>, as?: any): any {
    const inner = (as: Array<A>|Map<A>|string): number => size($filter(p)(as as any) as any)
    return as === undefined
        ? inner
        : inner(as)
}


/**
 * tsfun | any
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/all.spec.ts
 */
export function all<T>(p: Predicate<T>) {

    return (as: Array<T>|Map<T>): boolean => {

        return (values(as as any) as any).every(p)
    }
}


/**
 * tsfun | any
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/any.spec.ts
 */
export function any<T>(p: Predicate<T>) {

    return (as: Array<T>|Map<T>): boolean => {

        return (values(as as any) as any).some(p)
    }
}


/**
 * tsfun | prune
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/prune.spec.ts
 */
export function prune<T>(o: Map<T>): Map<T>
export function prune<A>(as: Array<A>): Array<A>
export function prune<T>(ts: Array<T>|Map<T>) {

    return $filter(isDefined)(ts as any)
}


/**
 * tsfun | indices
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/indices.spec.ts
 */
export function indices<A>(p: Predicate<A>): {
    (as: Array<A>): number[]
    (as: Map<A>): string[]
}
export function indices<A>(p: Predicate<A>, as: Array<A>): number[]
export function indices<A>(p: Predicate<A>, as: Map<A>): number[]
export function indices<A>(p: Predicate<A>, as?: any): any {

    const inner = (as: any): any => {

        return $reduce_a(
            (indices: number[], a: A, i: number|string) => p(a)
                ? indices.concat([i] as any)
                : indices
            , [])(as)
    }

    return as === undefined
        ? inner
        : inner(as)
}


/**
 * tsfun | size
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/associative/size.spec.ts
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
