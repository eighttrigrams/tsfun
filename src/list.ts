import {List, Mapping, Pair, Predicate} from './type'
import {isArray, isNot, isString} from './predicate'
import {copy} from './collection'
import {drop as stringDrop} from './string';
import {drop} from './array';


// ------------ @author Daniel de Oliveira -----------------


export const FIRST = 0;



export function reverse<A>(as: string): string
export function reverse<A>(as: Array<A>): Array<A>
export function reverse<A>(as: Array<A>|string): Array<A>|string {

    if (isArray(as)) {

        return (as as Array<A>).reduce((acc: Array<A>, a) => [a].concat(acc), [])

    } if (isString(as)) {

        return (as as string).split('').reverse().join('')

    } else {

        throw 'illegal argument - must be array or string'
    }
}


export function append<A>(...as2: Array<A>): Mapping<List<A>>
export function append<A>(...as2: Array<A>) {

    return (as: Array<A>|string) => {

        if (isArray(as) && isArray(as2)) {

            return as.concat(as2 as any) as Array<A>

        } else if (isString(as)) {

            return as.concat((as2 as any).join('')) as string
        }
    }
}



export function prepend<A>(...as2: Array<A>): Mapping<List<A>>
export function prepend<A>(...as2: Array<A>) {

    return (as: Array<A>|string) => {

        if (isArray(as) && isArray(as2)) {

            return as2.concat(as as any) as Array<A>

        } else if (isString(as)) {

            return (as2 as any).join('').concat(as) as string
        }
    }
}


export function takeNth(n: number): <A>(as: List<A>) => List<A>
export function takeNth(n: number) {

    const reducer = <A>(acc: Array<A>, val: any, i: number) =>
        i % n === 0 ? acc.concat([val]) : acc;

    return <A>(as: Array<A>|string) => {

        if (isArray(as)) {

            return n < 0 ? [] : (as as Array<A>).reduce(reducer, [])

        } else if (isString(as)) {

            return n < 0 ? '' : ((as as string).split('')).reduce(reducer, []).join('')

        } else {

            throw 'illegal argument - must be array or string'
        }
    }
}


// TODO remove
// export const takeUntil = <A>(predicate: Predicate<A>) =>
//     (as: Array<A>) =>
//         (found => found ?
//                 takeWhile(isNot(predicate))(as).concat([found])
//                 : as
//         )(as.find(predicate))


// export function zip<A>(as: string): {
//     <B>(bs: Array<B>): Array<Pair<string, B>>
//     (bs: string): Array<string>
// }
// export function zip<A>(as: Array<A>): {
//     <B>(bs: Array<B>): Array<Pair<A, B>>
//     (bs: string): Array<Pair<A, string>>
// }
/*
export function zip<A>(as: string): {
    <B>(bs: Array<B>): Array<Pair<string, B>>
    (bs: string): Array<string>
}
export function zip<A>(as: Array<A>): {
    <B>(bs: Array<B>): Array<Pair<A, B>>
    (bs: string): Array<Pair<A, string>>
}
export function zip<A>(as: Array<A>|string) {

    return <B>(bs: Array<B>|string): Array<Pair<A, B>>|Array<string> => {

        const asAndBsStrings = isString(as) && isString(bs)
        const as1 = isString(as) ? (as as string).split('') : as
        const bs1 = isString(bs) ? (bs as string).split('') : bs

        const minimumLength = Math.min(as.length, bs.length)
        const _as = take(minimumLength)(as as any)
        const _bs = take(minimumLength)(bs as any)

        const zipped: Array<[A, B]> = []
        for (let i = 0; i < minimumLength; i++) {
            zipped.push([_as[i] as A, _bs[i] as B])
        }
        return asAndBsStrings ? zipped.map(item => item.join('')) : zipped
    }
}*/


export function sort(s: string): string
export function sort(s: Array<number>): Array<number>
export function sort<A>(f: (a: A, b: A) => number): {
    (as: Array<A>): Array<A>
    (as: string): string
}
export function sort<A>(f: string|Array<number>|((a: A, b: A) => number)) {

    if (isString(f)) {

        return (f as string).split('').sort((a: string, b: string) => {
            if (a === b) return 0
            if (a < b) return -1
            return 1
        }).join('')

    } else if (typeof f !== 'function') {

        return (f as any).sort((a: string, b: string) => {
            if (a === b) return 0
            if (a < b) return -1
            return 1
        })

    } else return (as: Array<A>|string) => {

        if (isArray(as)) {
            return copy(as as any).sort(f as any)
        } else if (isString(as)) {
            return copy((as as any).split('')).sort(f as any).join('')
        } else {
            throw 'illegal argument - must be array or string'
        }
    }
}


export function first<T>(as: string): string|undefined;
export function first<T>(as: Array<T>): T|undefined;
export function first<T>(as: Array<T>|string): string|T|undefined {

    return as.length === 0
        ? undefined
        : as[0]
}


export function rest<T>(as: string): string
export function rest<T>(as: Array<T>): Array<T>
export function rest<T>(as: Array<T>|string): Array<T>|string {

    return isString(as)
        ? stringDrop(1)(as as any)
        : drop(1)(as as any)
}


export function last<T>(as: string): string|undefined
export function last<T>(as: Array<T>): T|undefined
export function last<T>(as: Array<T>|string): string|T|undefined {

    return as.length === 0
        ? undefined
        : as[as.length-1]
}