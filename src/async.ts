import {Pair, Map, Either, Maybe} from './type'
import {isArray, isFailure, isFunction, isObject, isString} from './predicate'
import {keys, keysAndValues} from './associative'
import {getSuccess} from './tuple'
import {first, rest} from './list'
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


export function forEach<A>(f: (_: A, i?: number|string) => Promise<void>): {
    (as: Array<A>): Promise<Array<A>>
    (os: Map<A>): Promise<Map<A>>
}
export function forEach<A>(f: (_: A, i?: number|string) => Promise<void>) {

    return async (as: any) => {

        if (isArray(as)) {

            let i = 0
            for (let item of as) {
                await (f as any)(item, i)
                i++
            }
            return as as Array<A>

        } else if (isObject(as)) {

            for (let item of keysAndValues(as as any)) {
                await (f as any)(item[1], item[0])
            }
            return as as Map<A>
        }
    }
}


export function filter<T>(p: (a: T, i?: string|number) => Promise<boolean>): {
    (as: Array<T>): Promise<Array<T>>
    (os: Map<T>): Promise<Map<T>>
    (s: string): Promise<string>
}
export function filter<T>(p: (t: T, i?: string|number) => Promise<boolean>) {

    return async (as) => {

        if (isArray(as)) {

            const as1 = []
            let i = 0
            for (let a of as) {
                if (await p(a as any, i)) as1.push(a as never)
                i++
            }

            return as1 as Array<T>

        } else if (isObject(as)) {

            const o = as as Map<T>

            const o1: any = {}
            let i = 0
            for (let k of keys(o)) {
                if (await p(o[k], k)) o1[k] = o[k]
                i++
            }

            return o1 as Map<T>

        } else if (isString(as)) {

            const s = (as as any).split('')

            const s1: any = []
            let i = 0
            for (let k of keys(s)) {
                if (await p(s[k], k)) s1[k] = s[k]
                i++
            }

            return (s1.join('')) as string

        } else {

            throw 'illegal argument - must be array or object'
        }
    }
}



export function separate<T>(p: (a: T, i?: string|number) => Promise<boolean>): {
    (as: Array<T>): Promise<Pair<Array<T>, Array<T>>>
    (os: Map<T>): Promise<Pair<Map<T>, Map<T>>>
    (s: string): Promise<Pair<string, string>>
}
export function separate<T>(p: (t: T, i?: string|number) => Promise<boolean>) {

    return async (as: Array<T>|Map<T>|string) => {

        if (isArray(as)) {

            return [
                await filter(p)(as as Array<T>),
                await remove(p)(as as Array<T>)
            ] as Pair<Array<T>, Array<T>>

        } else if (isObject(as)) {

            return [
                await filter(p)(as as Map<T>),
                await remove(p)(as as Map<T>)
            ] as Pair<Map<T>, Map<T>>

        } else if (isString(as)) {

            return [
                await filter(p)(as as any),
                await remove(p)(as as any)
            ] as unknown as Pair<string, string>

        } else {

            throw 'illegal argument - must be array or object'
        }
    }
}


export function remove<A>(p: (a: A, i?: string|number) => Promise<boolean>): {
    (as: Array<A>): Promise<Array<A>>
    (os: Map<A>): Promise<Map<A>>
    (s: string): Promise<string>
}
export function remove<A>(p: (a: A, i?: string|number) => Promise<boolean>) {

    return filter(async (a: any, i?: string|number) => !(await p(a, i)))
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
export async function map<A, B>(f: (_: A, k: string) => Promise<B>, as: Map<A>): Promise<Map<B>>
export async function map<A, B>(f: (_: A) => Promise<B>, as: Map<A>): Promise<Map<B>>
export async function map<A, B>(f: (_: A, i?: any) => Promise<B>, as?: any): Promise<any> {

    const inner = async (as: any) => {

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

    return as === undefined
        ? inner
        : inner(as)
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
