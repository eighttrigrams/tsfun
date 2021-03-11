import { isFunction } from "./predicate"
import { RIGHT } from "./tuple"
import { KWList, Pair } from "./type"


export function distribute<A,B>(f: (a: A) => B): (as: Array<A>) => KWList<B,Array<A>>
export function distribute<A,B>(f: (a: A) => B, as: Array<A>): KWList<B,Array<A>>
export function distribute<A,B>(as: Array<A>, f: (a: A) => B): KWList<B,Array<A>>
export function distribute(arg, arg2?) {

    const $ = f => as =>
        as.reduce((acc, a) => {

            const r = f(a)
            const found = acc.find(([v, _]) => v === r)
            if (found) found[RIGHT].push(a)
            else acc.push([r, [a]])

            return acc

        }, [])

    return arg2 === undefined
        ? $(arg)
        : isFunction(arg)
            ? $(arg)(arg2)
            : $(arg2)(arg)
}


export function kwlistToMap<A>(kw: KWList<string,A>) {
 
    return kw.reduce((acc, [k,v]) => {

        acc[k] = v
        return acc

    }, {})
}
