import {Collection, Map, Mapping, Pair, Predicate} from './type'
import {isArray, isDefined, isFunction, isObject, isString} from './predicate'
import {keys, $reduce_a, values} from './associative'


export type Filter<T = any> = Mapping<Collection<T>>


export function filter<A>(p: (a: A, i?: number|string) => boolean): (_: Collection<A>) => Collection<A>
export function filter<A>(p: (a: A, i: number) => boolean, as: Array<A>): Array<A>
export function filter<A>(p: (a: A) => boolean, as: Array<A>): Array<A>
export function filter<A>(as: Array<A>, p: (a: A, i: number) => boolean): Array<A>
export function filter<A>(as: Array<A>, p: (a: A) => boolean): Array<A>
export function filter<A>(p: (a: A, i: string) => boolean, as: Map<A>): Map<A>
export function filter<A>(p: (a: A) => boolean, as: Map<A>): Map<A>
export function filter<A>(as: Map<A>, p: (a: A, i: string) => boolean): Map<A>
export function filter<A>(as: Map<A>, p: (a: A) => boolean): Map<A>
export function filter<A>(p: (a: A, i: number) => boolean, as: string): string
export function filter<A>(p: (a: A) => boolean, as: string): string
export function filter<A>(as: string, p: (a: A, i: number) => boolean): string
export function filter<A>(as: string, p: (a: A) => boolean): string
export function filter<A>(...args): any {

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

        } else if (isString(as)) {

            const s = (as as any).split('')

            const o1: any = []
            let i = 0
            for (let k of keys(s)) {
                if (p(s[k], k)) o1[k] = s[k]
                i++
            }

            return o1.join('') as string

        } else {

            throw 'illegal argument - must be array or object'
        }
    }

    return args.length === 1
        ? $(args[0])
        : isFunction(args[0])
            ? $(args[0])(args[1])
            : $(args[1])(args[0])
}


export function remove<A>(p: (a: A, i?: number|string) => boolean): (as: Collection) => Collection
export function remove<A>(p: (a: A, i: number) => boolean, as: Array<A>): Array<A>
export function remove<A>(p: (a: A) => boolean, as: Array<A>): Array<A>
export function remove<A>(as: Array<A>, p: (a: A, i: number) => boolean): Array<A>
export function remove<A>(as: Array<A>, p: (a: A) => boolean): Array<A>
export function remove<A>(p: (a: A, i: number) => boolean, as: string): string
export function remove<A>(p: (a: A) => boolean, as: string): string
export function remove<A>(as: string, p: (a: A, i: number) => boolean): string
export function remove<A>(as: string, p: (a: A) => boolean): string
export function remove<A>(p: (a: A, i: string) => boolean, as: Map<A>): Map<A>
export function remove<A>(p: (a: A) => boolean, as: Map<A>): Map<A>
export function remove<A>(as: Map<A>, p: (a: A, i: string) => boolean): Map<A>
export function remove<A>(as: Map<A>, p: (a: A) => boolean): Map<A>
export function remove<A>(...args): any {

    const inner = p => filter((a: any, i: number|string) => !p(a, i))

    return args.length === 1
        ? inner(args[0])
        : isFunction(args[0])
            ? inner(args[0])(args[1])
            : inner(args[1])(args[0]) as any
}


export function separate<A>(p: (a: A, i?: number|string) => boolean): (as: Collection<A>) => Pair<Collection<A>>
export function separate<A>(p: (a: A, i: number) => boolean, as: string): Pair<string>
export function separate<A>(p: (a: A) => boolean, as: string): Pair<string>
export function separate<A>(as: string, p: (a: A, i: number) => boolean): Pair<string>
export function separate<A>(as: string, p: (a: A) => boolean): Pair<string>
export function separate<A>(p: (a: A, i: number) => boolean, as: Array<A>): Pair<Array<A>>
export function separate<A>(p: (a: A) => boolean, as: Array<A>): Pair<Array<A>>
export function separate<A>(as: Array<A>, p: (a: A, i: number) => boolean): Pair<Array<A>>
export function separate<A>(as: Array<A>, p: (a: A) => boolean): Pair<Array<A>>
export function separate<A>(p: (a: A, i: string) => boolean, as: Map<A>): Pair<Map<A>>
export function separate<A>(p: (a: A) => boolean, as: Map<A>): Pair<Map<A>>
export function separate<A>(as: Map<A>, p: (a: A, i: string) => boolean): Pair<Map<A>>
export function separate<A>(as: Map<A>, p: (a: A) => boolean): Pair<Map<A>>
export function separate<A>(...args): any {

    const $ = p => (as: Array<A>|Map<A>): Pair<Array<A>, Array<A>>|Pair<Map<A>,Map<A>> =>
        [filter(p)(as as any) as any, remove(p)(as as any) as any]

    return args.length === 1
        ? $(args[0])
        : isFunction(args[0])
            ? $(args[0])(args[1])
            : $(args[1])(args[0])
}
