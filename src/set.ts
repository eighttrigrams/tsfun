import {uncurry2} from './core'
import {Comparator} from './type'
import {isEmpty, isNot, isString} from './predicate'
import {includedInBy} from './comparator'
import {reduce1} from './array'

// ------------ @author Daniel de Oliveira -----------------



// Contributed by Thomas Kleinke
export function duplicates(s: string): string
export function duplicates<A>(s: Array<A>): Array<A>
export function duplicates<A>(as: Array<A>|string) {

    function inner(as1: Array<A>) {

        const temp: any[] = []
        const result: any[] = []

        for (let value of as1) {
            if (temp.indexOf(value) > -1 && result.indexOf(value) == -1) {
                result.push(value)
            } else {
                temp.push(value)
            }
        }

        return result
    }

    return isString(as)
        ? (inner((as as any).split('')) as any).join('')
        : inner(as as any)
}

export const intersectionBy =
    (compare?: Comparator) =>
        <A>(aas: Array<Array<A>>): Array<A> => {

            if (aas.length < 1) return []
            if (aas.length === 1) return aas[0]

            if (compare) return aas.reduce(uncurry2<A>(_intersectBy(compare)))

            for (let i = 0; i < aas.length - 1; i++) {
                // see https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript, answer of le_m
                aas[i+1] = aas[i].filter(Set.prototype.has, new Set(aas[i + 1]))
            }
            return setBy(undefined as any)(aas[aas.length - 1])
        }


export const unionBy =
    (compare?: Comparator) =>
        <A>(aas: Array<Array<A>>): Array<A> => {

            if (aas.length < 1) return [];
            if (compare) return aas.reduce(
                (acc: any, val:any) => val ? _uniteBy(compare)(acc)(val) : acc)

            // https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays, answer of Gumbo and Mark Amery
            return setBy(undefined as any)([].concat.apply([], aas))
        }


export const intersectBy =
    (compare?: Comparator) =>
        <A>(as1: Array<A>) =>
            (as2: Array<A>): Array<A> => intersectionBy(compare)<A>([as1, as2])


export const uniteBy = (compare?: Comparator) => <A>(as1: Array<A>) =>
    (as2: Array<A>): Array<A> => unionBy(compare)([as1, as2])



// Generate a new list with elements which are contained in as but not in subtrahend
export const subtractBy =
    (compare?: Comparator) =>
        <A>(subtrahend: Array<A>) =>
            (as: Array<A>): Array<A> => {

                const filterFun = compare
                    ? isNot(includedInBy(compare)(subtrahend))
                    : (() => {
                        const unionSubtrahendsSet = new Set(subtrahend)
                        return (x: A) => !unionSubtrahendsSet.has(x)
                    })()

                return setBy(undefined as any)(as).filter(filterFun)
            }


export const setBy = (compare?: Comparator) =>
    <A>(as: Array<A>): Array<A> => {

        return compare
            ? as.reduce((acc: Array<A>, val) =>
                    includedInBy(compare)(acc)(val)
                        ? acc : acc.concat([val])
                ,[])
            : Array.from(new Set(as))
    }


// @returns the union of a1 and a2
const _uniteBy = (compare: Comparator) => <A>(as1: Array<A>) =>
    (as2: Array<A>) =>
        as1.concat(
            as2.filter(isNot(includedInBy(compare)(as1))))


const _intersectBy = (compare: Comparator) => <A>(as1: Array<A>) =>
    (as2: Array<A>) => as1.filter(includedInBy(compare)(as2))


export function intersection(aas: Array<string>): Array<string>;
export function intersection<A>(aas: Array<Array<A>>): Array<A>;
export function intersection<A>(aas: Array<Array<A>>|Array<string>) {

    if (isEmpty(aas)) return []
    return isString(aas[0])
        ? (intersectionBy()((aas as any).map((as: any) => as.split('')))).join('')
        : intersectionBy()(aas as any)
}

// TODO remove intersection function then, but consider intersectBy and intersectionBy

export function intersect(set1: string): (as2: string) => string
export function intersect<A>(set1: Array<A>): (set2: Array<A>) => Array<A>
export function intersect(...sets: string[]): string
export function intersect<A>(...sets: Array<Array<A>>): Array<A>
export function intersect<A>(...sets: any[]): any {

    if (sets.length === 0) throw 'illegal argument - intersect expects at least one argument in first parameter list'

    const inner = (set1: any) => (set2: any) =>  // TODO add Set type to type.ts
        isEmpty(set1) || isEmpty(set2)
            ? []
            : isString(set1)
                ? (intersectBy()((set1 as any).split(''))((set2 as any).split(''))).join('')
                : intersectBy()(set1 as any)(set2 as any) as any;

    return sets.length === 1
        ? inner(sets[0])
        : reduce1(uncurry2(inner))(sets) // TODO perhaps rename redue1 to fold
}


export function union(aas: Array<string>): Array<string>
export function union<A>(aas: Array<Array<A>>): Array<A>
export function union<A>(aas: Array<Array<A>>|Array<string>) {

    if (isEmpty(aas)) return [];
    return isString(aas[0])
        ? (unionBy()((aas as any).map((as: any) => as.split('')))).join('')
        : unionBy()(aas as any)
}


export function unite(as1: string): (as2: string) => string;
export function unite<A>(as1: Array<A>): (as2: Array<A>) => Array<A>;
export function unite<A>(as1: Array<A>|string) {
    return (as2: Array<A>|string) => {

        return isString(as1) || isString(as2)
            ? (uniteBy()((as1 as any).split(''))((as2 as any).split(''))).join('')
            : uniteBy()(as1 as any)(as2 as any) as any
    }
}


// Generate a new list with elements which are contained in as but not in subtrahend
export function subtract(as1: string): (as2: string) => string
export function subtract<A>(as1: Array<A>): (as2: Array<A>) => Array<A>
export function subtract<A>(as1: Array<A>|string) {
    return (as2: Array<A>|string) => {

        return isString(as1) || isString(as2)
            ? (subtractBy()((as1 as any).split(''))((as2 as any).split(''))).join('')
            : subtractBy()(as1 as any)(as2 as any) as any
    }
}


export function set(as: string): string
export function set<A>(as: Array<A>): Array<A>
export function set<A>(as: Array<A>|string) {

    if (isEmpty(as)) return []

    return isString(as)
        ? (setBy()((as as any).split(''))).join('')
        : setBy()(as as any)
}
