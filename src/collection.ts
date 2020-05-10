import {Map, Pair, Predicate} from './type'
import {and, isArray, isDefined, isObject, isString} from './predicate'
import {keys, reduce, values} from './associative'


export function copy<T>(struct: Array<T>): Array<T>
export function copy<T>(struct: Map<T>): Map<T>
export function copy(struct: string): string
export function copy<T>(struct: Array<T>|Map<T>|string) {

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
    const inner = (as: Array<A>|Map<A>|string): number => size(filter(p)(as as any))
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


export function filter<A>(p: (a: A, i?: number|string) => boolean): {
    (as: Array<A>): Array<A>
    (os: Map<A>): Map<A>
    (s: string): string
}
export function filter<A>(p: (a: A, i?: number) => boolean, as: Array<A>): Array<A>
export function filter<A>(p: (a: A, i?: string) => boolean, as: Map<A>): Map<A>
export function filter<A>(p: (a: A, i?: number) => boolean, as: string): string
export function filter<A>(p: (a: A, i?: any) => boolean, as?: any): any {

    const inner = (as: Array<A>|Map<A>) => {

        if (isArray(as)) {

            const as1 = []
            let i = 0
            for (let a of as) {
                if (p(a, i)) as1.push(a)
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

    return as === undefined
        ? inner
        : inner(as)
}


export function indices(p: Predicate<string>): {
    (as: string): number[]
    (as: Array<string>): number[]
}
export function indices<A>(p: Predicate<A>): {
    (as: Array<A>): number[]
    (as: Map<A>): string[]
}
export function indices<A>(p: Predicate<A>) {

    return (as: Array<A>|string|Map<A>): number[]|string[] => {

        return reduce(
            (indices: number[], a: A, i: number|string) => p(a)
                ? indices.concat([i] as any)
                : indices
            , [])(isString(as) ? (as as any).split('') : as);
    }
}


export function size(as: string): number;
export function size<A>(as: Array<A>): number;
export function size<T>(o: Map<T>): number;
export function size<T>(o: string|Array<T>|Map<T>): number {

    return (isArray(o) || isString(o)
        ? o.length
        : keys(o as any).length) as number;
}



export function remove<A>(p: (a: A, i?: number|string) => boolean): {
    (as: Array<A>): Array<A>
    (os: Map<A>): Map<A>
    (s: string): string
}
export function remove<A>(p: (a: A, i?: number|string) => boolean) {

    return filter((a: any, i: number|string) => !p(a, i));
}


export function separate<A>(p: (a: A, i?: number|string) => boolean): {
    (as: Array<A>): Pair<Array<A>,Array<A>>
    (os: Map<A>): Pair<Map<A>,Map<A>>
    (s: string): Pair<string, string>
}
export function separate<A>(p: (a: A, i?: number|string) => boolean) {

    return (as: Array<A>|Map<A>): Pair<Array<A>, Array<A>>|Pair<Map<A>,Map<A>> =>
        [filter(p)(as as any), remove(p)(as as any)];
}


export function all<T>(p: Predicate<T>) {

    return (as: string|Array<T>|Map<T>): boolean => {

        return (isString(as))
            ? (as as any).split('').every(p)
            : (values(as as any)).every(p);
    }
}


export function any<T>(p: Predicate<T>) {

    return (as: string|Array<T>|Map<T>): boolean => {

        return (isString(as))
            ? (as as any).split('').some(p)
            : (values(as as any)).some(p);
    }
}