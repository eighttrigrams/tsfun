import {Collection, Map, Mapping, Pair, Predicate} from './type'
import {isArray, isDefined, isFunction, isObject, isString} from './predicate'
import {keys, reduce_a, values} from './associative'


export type Filter<T = any> = Mapping<Collection<T>>


export function copy<T>(struct: Array<T>): Array<T>
export function copy<T>(struct: Map<T>): Map<T>
export function copy(struct: string): string
export function copy<T>(struct: any) {

    return isString(struct)
        ? (struct as any).slice()
        : isArray(struct)
            ? [...struct]
            : {...struct as any}
}


export function count<A>(p: Predicate<A>): {
    (as: Array<A>): number
    (os: Map<A>): number
    (s: string): number
}
export function count<A>(p: Predicate<A>, as: Array<A>|Map<A>|string): number
export function count<A>(p: Predicate<A>, as?: any): any {
    const inner = (as: Array<A>|Map<A>|string): number => size(filter(p)(as as any) as any)
    return as === undefined
        ? inner
        : inner(as)
}


export function prune(o: string): string
export function prune<T>(o: Map<T>): Map<T>
export function prune<A>(as: Array<A>): Array<A>
export function prune<T>(ts: Array<T>|Map<T>|string) {

    return !isString(ts)
        ? filter(isDefined)(ts as any)
        : (ts as string).replace(' ', '') as any
}


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


export function indices(p: Predicate<string>): {
    (as: string): number[]
    (as: Array<string>): number[]
}
export function indices<A>(p: Predicate<A>): {
    (as: Array<A>): number[]
    (as: Map<A>): string[]
}
export function indices<A>(p: Predicate<string>, as: string): number[]
export function indices<A>(p: Predicate<string>, as: Array<string>): number[]
export function indices<A>(p: Predicate<A>, as: Array<A>): number[]
export function indices<A>(p: Predicate<A>, as: Map<A>): number[]
export function indices<A>(p: Predicate<A>, as?: any): any {

    const inner = (as: any): any => {

        return reduce_a(
            (indices: number[], a: A, i: number|string) => p(a)
                ? indices.concat([i] as any)
                : indices
            , [])(isString(as) ? (as as any).split('') : as)
    }

    return as === undefined
        ? inner
        : inner(as)
}


export function size(as: string): number
export function size<A>(as: Array<A>): number
export function size<T>(o: Map<T>): number
export function size<T>(o: string|Array<T>|Map<T>): number {

    return (isArray(o) || isString(o)
        ? o.length
        : keys(o as any).length) as number
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


export function all<T>(p: Predicate<T>) {

    return (as: string|Array<T>|Map<T>): boolean => {

        return (isString(as))
            ? (as as any).split('').every(p)
            : (values(as as any) as any).every(p)
    }
}


export function any<T>(p: Predicate<T>) {

    return (as: string|Array<T>|Map<T>): boolean => {

        return (isString(as))
            ? (as as any).split('').some(p)
            : (values(as as any) as any).some(p)
    }
}