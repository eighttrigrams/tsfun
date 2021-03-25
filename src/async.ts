import {Pair, Map, Either, Maybe} from './type'
import {isArray, isFailure, isFunction, isObject, isString} from './predicate'
import {keys} from './associative'
import {getSuccess} from './tuple'
import {first, rest} from './array'
import {convert} from './composition'


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


export function filter<T>(p: (a: T, i?: string|number) => Promise<boolean>): Promise<{
    (as: Array<T>): Promise<Array<T>>
    (os: Map<T>): Promise<Map<T>>
    (s: string): Promise<string>
}>
export function filter<T>(p: (t: T, i: number) => Promise<boolean>, as: Array<T>): Promise<Array<T>>
export function filter<T>(p: (t: T) => Promise<boolean>, as: Array<T>): Promise<Array<T>>
export function filter<T>(as: Array<T>, p: (t: T, i: number) => Promise<boolean>): Promise<Array<T>>
export function filter<T>(as: Array<T>, p: (t: T) => Promise<boolean>): Promise<Array<T>>
export function filter<T>(p: (t: T, i: string) => Promise<boolean>, as: Map<T>): Promise<Map<T>>
export function filter<T>(p: (t: T) => Promise<boolean>, as: Map<T>): Promise<Map<T>>
export function filter<T>(as: Map<T>, p: (t: T, i: string) => Promise<boolean>): Promise<Map<T>>
export function filter<T>(as: Map<T>, p: (t: T) => Promise<boolean>): Promise<Map<T>>
export function filter<T>(p: (t: T, i: string) => Promise<boolean>, as: string): Promise<string>
export function filter<T>(p: (t: T) => Promise<boolean>, as: string): Promise<string>
export function filter<T>(as: string, p: (t: T, i: string) => Promise<boolean>): Promise<string>
export function filter<T>(as: string, p: (t: T) => Promise<boolean>): Promise<string>
export function filter(...args) {

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

        } else if (isString(as)) {

            const s = as.split('')

            const s1 = []
            let i = 0
            for (let k of keys(s)) {
                if (await p(s[k], k)) (s1 as any)[k] = s[k]
                i++
            }

            return (s1.join(''))

        } else {

            throw 'illegal argument - must be array or object'
        }
    }

    return args.length === 1
        ? $(args[0])
        : isFunction(args[0])
            ? $(args[0])(args[1])
            : $(args[1])(args[0]) as any
}


export function reduce<A, B>(f: (b: B, a: A, i?: number|string) => Promise<B>, init: B): Promise<{
    (as: Array<A>): Promise<B>
    (os: Map<A>): Promise<B>
}>
export function reduce<A, B>(f: (b: B, a: A, i: number) => Promise<B>, init: B, as: Array<A>): Promise<B>
export function reduce<A, B>(f: (b: B, a: A) => Promise<B>, init: B, as: Array<A>): Promise<B>
export function reduce<A, B>(as: Array<A>, f: (b: B, a: A, i: number) => Promise<B>, init: B, ): Promise<B>
export function reduce<A, B>(as: Array<A>, f: (b: B, a: A) => Promise<B>, init: B): Promise<B>
export function reduce<A, B>(f: (b: B, a: A, i: string) => Promise<B>, init: B, as: Map<A>): Promise<B>
export function reduce<A, B>(f: (b: B, a: A) => Promise<B>, init: B, as: Map<A>): Promise<B>
export function reduce<A, B>(as: Map<A>, f: (b: B, a: A, i: string) => Promise<B>, init: B): Promise<B>
export function reduce<A, B>(as: Map<A>, f: (b: B, a: A) => Promise<B>, init: B): Promise<B>
export function reduce<T, B>(...params): Promise<any> {

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



export function map<A, B>(f: (_: A, i?: string|number) => Promise<B>): Promise<{
    (as: Array<A>): Promise<Array<B>>
    (os: Map<A>): Promise<Map<B>>
}>
export async function map<A, B>(f: (_: A, i: number) => Promise<B>, as: Array<A>): Promise<Array<B>>
export async function map<A, B>(f: (_: A) => Promise<B>, as: Array<A>): Promise<Array<B>>
export async function map<A, B>(as: Array<A>, f: (_: A, i: number) => Promise<B>): Promise<Array<B>>
export async function map<A, B>(as: Array<A>, f: (_: A) => Promise<B>): Promise<Array<B>>
export async function map<A, B>(f: (_: A, k: string) => Promise<B>, as: Map<A>): Promise<Map<B>>
export async function map<A, B>(f: (_: A) => Promise<B>, as: Map<A>): Promise<Map<B>>
export async function map<A, B>(as: Map<A>, f: (_: A, k: string) => Promise<B>): Promise<Map<B>>
export async function map<A, B>(as: Map<A>, f: (_: A) => Promise<B>): Promise<Map<B>>
export async function map<A, B>(...args): Promise<any> {

    const inner = f => async (as: any) => {

        if (isArray(as)) {

            const bs: Array<B> = []
            for (let a of as) bs.push(await f(a))
            return bs

        } else if (isObject(as)) {

            const result: Map<B> = {}
            for (let key of Object.keys(as)) result[key] = await f(as[key], key)
            return result

        } else {

            throw 'illegal argument - must be array or object'
        }
    }

    return args.length === 1
        ? inner(args[0])
        : isFunction(args[0])
            ? inner(args[0])(args[1])
            : inner(args[1])(args[0])
}


export async function flow(a: any, ...b: Array<Function|Promise<Function>>): Promise<any> {

    let currentA = a
    for (let currentB of b) currentA = await ((await currentB)(currentA))
    return currentA
}


export function compose(...b: Array<Function|Promise<Function>>) {

    return async /* TODO review use of async here, maybe replace by Promise return value annotation */ (a: any) => flow(a, ...b)
}


// TODO review if we need the double await (like in flow here too, now since we allow single as well as multiparam lists in functions like asyncMap
export function mcompose<T, R>(...fs: Array<(x: T, ...xs: Array<T>) => Promise<Either<any, T>>|Either<any, T>>)
    : (seed: Either<any, T>) => Promise<Either<any, R>>
export function mcompose<T, R>(...fs: Array<(x: T, ...xs: Array<T>) => Promise<Maybe<T>>|Maybe<T>>)
    : (seed: Maybe<T>) => Promise<Maybe<R>>
export function mcompose<T, R>(...fs: Array<
                                   (x: T, ...xs: Array<T>) =>
                                       Promise<Either<any, T>>
                                       |Promise<Maybe<T>>
                                       |Either<any, T>
                                       |Maybe<T>
                                   >) {

    return async (seed: Maybe<T>|Either<any, T>) => {
        if (isFailure(seed)) return seed as any

        let results = [getSuccess(seed)] as Array<T>
        for (let f of fs) {

            const res = await f(first(results) as T, ...rest(results))
            if (isFailure(res)) return res as any
            results = [getSuccess(res)].concat(results)
        }
        return convert(first(results), seed) as any
    }
}
