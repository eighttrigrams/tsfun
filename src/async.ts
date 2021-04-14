import {Map, Either, Maybe} from './type'
import {isArray, isErr, isFunction, isObject, isString} from './predicate'
import {keys} from './associative'
import {ok} from './tuple'
import {first, rest} from './array'
import {convert} from './composition'
import {throwIllegalArgs} from './core'


/*
 * Implementation note regarding the multi argument list cases:
 * In contrast to the other functions, say, for example, 'map' of
 * the 'associative' package, the multi argument versions here type correctly,
 * for example from Array<A> to Array<B> and from Map<A> to Map<B>.
 * This is not the case there (in the other packages), because there
 * we focus on their typing characteristics in composition contexts.
 * For example in a typed flow, we want to have a filter after a map,
 * the 'map' giving an Associative and the filter taking 'one'.
 * This however, does not play a role in an async composition context,
 * because async compositions are simply typed to 'any' in all cases, for
 * the sake of simplicity.
 */


/**
 * tsfun | aFilter
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/async/aFilter.spec.ts
 */
export function aFilter<T>(p: (a: T, i?: string|number) => Promise<boolean>): Promise<{
    (as: Array<T>): Promise<Array<T>>
    (os: Map<T>): Promise<Map<T>>
}>
export function aFilter<T>(p: (t: T, i: number) => Promise<boolean>, as: Array<T>): Promise<Array<T>>
export function aFilter<T>(p: (t: T) => Promise<boolean>, as: Array<T>): Promise<Array<T>>
export function aFilter<T>(as: Array<T>, p: (t: T, i: number) => Promise<boolean>): Promise<Array<T>>
export function aFilter<T>(as: Array<T>, p: (t: T) => Promise<boolean>): Promise<Array<T>>
export function aFilter<T>(p: (t: T, i: string) => Promise<boolean>, as: Map<T>): Promise<Map<T>>
export function aFilter<T>(p: (t: T) => Promise<boolean>, as: Map<T>): Promise<Map<T>>
export function aFilter<T>(as: Map<T>, p: (t: T, i: string) => Promise<boolean>): Promise<Map<T>>
export function aFilter<T>(as: Map<T>, p: (t: T) => Promise<boolean>): Promise<Map<T>>
export function aFilter(...args) {

    const $ = p => async (as) => {

        if (isArray(as)) {

            const as1 = []
            let i = 0
            for (let a of as) {
                if (await p(a, i)) as1.push(a as never)
                i++
            }

            return as1

        } else if (isObject(as)) {

            const o = as

            const o1 = {}
            let i = 0
            for (let k of keys(o)) {
                if (await p(o[k], k)) o1[k] = o[k]
                i++
            }

            return o1

        } else {

            throwIllegalArgs('aFilter', 'Associative', as)
        }
    }

    return args.length === 1
        ? $(args[0])
        : isFunction(args[0])
            ? $(args[0])(args[1])
            : $(args[1])(args[0]) as any
}


/**
 * tsfun | aReduce
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/async/a_reduce.spec.ts
 */
export function aReduce<A, B>(f: (b: B, a: A, i?: number|string) => Promise<B>, init: B): Promise<{
    (as: Array<A>): Promise<B>
    (os: Map<A>): Promise<B>
}>
export function aReduce<A, B>(f: (b: B, a: A, i: number) => Promise<B>, init: B, as: Array<A>): Promise<B>
export function aReduce<A, B>(f: (b: B, a: A) => Promise<B>, init: B, as: Array<A>): Promise<B>
export function aReduce<A, B>(as: Array<A>, f: (b: B, a: A, i: number) => Promise<B>, init: B, ): Promise<B>
export function aReduce<A, B>(as: Array<A>, f: (b: B, a: A) => Promise<B>, init: B): Promise<B>
export function aReduce<A, B>(f: (b: B, a: A, i: string) => Promise<B>, init: B, as: Map<A>): Promise<B>
export function aReduce<A, B>(f: (b: B, a: A) => Promise<B>, init: B, as: Map<A>): Promise<B>
export function aReduce<A, B>(as: Map<A>, f: (b: B, a: A, i: string) => Promise<B>, init: B): Promise<B>
export function aReduce<A, B>(as: Map<A>, f: (b: B, a: A) => Promise<B>, init: B): Promise<B>
export function aReduce<T, B>(...params): Promise<any> {

    const inner = (f, init) => async (coll) => {

        if (isArray(coll)) {

            let acc = init
            let i = 0
            for (let a of coll) {
                acc = await f(acc, a, i)
                i++;
            }
            return acc

        } else if (isObject(coll)) {

            const o = coll as Map<T>

            let acc = init
            for (let k of keys(coll)) {
                acc = await f(acc, o[k], k)
            }
            return acc

        } else {

            throw 'illegal argument - must be array or object'
        }
    }

    return params.length === 2
            ? inner(params[0], params[1])
            : isFunction(params[0])
                 ? inner(params[0], params[1])(params[2])
                 : inner(params[1], params[2])(params[0]) as any
}


/**
 * tsfun | a_map
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/async/a_map.spec.ts
 */
export function aMap<A, B>(f: (_: A, i?: string|number) => Promise<B>): Promise<{
    (as: Array<A>): Promise<Array<B>>
    (os: Map<A>): Promise<Map<B>>
}>
export async function aMap<A, B>(f: (_: A, i: number) => Promise<B>, as: Array<A>): Promise<Array<B>>
export async function aMap<A, B>(f: (_: A) => Promise<B>, as: Array<A>): Promise<Array<B>>
export async function aMap<A, B>(as: Array<A>, f: (_: A, i: number) => Promise<B>): Promise<Array<B>>
export async function aMap<A, B>(as: Array<A>, f: (_: A) => Promise<B>): Promise<Array<B>>
export async function aMap<A, B>(f: (_: A, k: string) => Promise<B>, as: Map<A>): Promise<Map<B>>
export async function aMap<A, B>(f: (_: A) => Promise<B>, as: Map<A>): Promise<Map<B>>
export async function aMap<A, B>(as: Map<A>, f: (_: A, k: string) => Promise<B>): Promise<Map<B>>
export async function aMap<A, B>(as: Map<A>, f: (_: A) => Promise<B>): Promise<Map<B>>
export async function aMap(...args) {

    const inner = f => async (as: any) => {

        if (isArray(as)) {

            const bs: Array<any> = []
            for (let i=0; i < as.length; i++) bs.push(await f(as[i], i))
            return bs

        } else if (isObject(as)) {

            const result: Map<any> = {}
            for (let key of Object.keys(as)) result[key] = await f(as[key], key)
            return result

        } else throwIllegalArgs('async/map', 'Associative', as)
    }

    return args.length === 1
        ? inner(args[0])
        : isFunction(args[0])
            ? inner(args[0])(args[1])
            : inner(args[1])(args[0])
}


/**
 * tsfun | aFlow
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/async/a_flow.spec.ts
 */
export async function aFlow(a: any, ...b: Array<Function|Promise<Function>>): Promise<any> {

    let currentA = a
    for (let currentB of b) currentA = await ((await currentB)(currentA))
    return currentA
}


/**
 * tsfun | aFilter
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/async/a_filter.spec.ts
 */
export function aCompose(...b: Array<Function|Promise<Function>>) {

    return async /* TODO review use of async here, maybe replace by Promise return value annotation */ (a: any) => aFlow(a, ...b)
}


// TODO review if we need the double await (like in flow here too, now since we allow single as well as multiparam lists in functions like asyncMap
/**
 * tsfun | aMcompose
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/async/a_mcompose.spec.ts
 */
export function aMcompose<T, R>(...fs: Array<(x: T, ...xs: Array<T>) => Promise<Either<any, T>>|Either<any, T>>)
    : (seed: Either<any, T>) => Promise<Either<any, R>>
export function aMcompose<T, R>(...fs: Array<(x: T, ...xs: Array<T>) => Promise<Maybe<T>>|Maybe<T>>)
    : (seed: Maybe<T>) => Promise<Maybe<R>>
export function aMcompose<T, R>(...fs: Array<
                                   (x: T, ...xs: Array<T>) =>
                                       Promise<Either<any, T>>
                                       |Promise<Maybe<T>>
                                       |Either<any, T>
                                       |Maybe<T>
                                   >) {

    return async (seed: Maybe<T>|Either<any, T>) => {
        if (isErr(seed)) return seed as any

        let results = [ok(seed)] as Array<T>
        for (let f of fs) {

            const res = await f(first(results) as T, ...rest(results))
            if (isErr(res)) return res as any
            results = [ok(res)].concat(results)
        }
        return convert(first(results), seed) as any
    }
}
