import {List} from './type'
import {isArray, isString} from './predicate'
import {copy} from './associative'


// ------------ @author Daniel de Oliveira -----------------


export const FIRST = 0



export function takeNth(n: number): <A>(as: List<A>) => List<A>
export function takeNth(n: number) {

    const reducer = <A>(acc: Array<A>, val: any, i: number) =>
        i % n === 0 ? acc.concat([val]) : acc

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
