import {uncurry2} from './core'
import {Comparator} from './type'
import {isEmpty, isFunction, isNot, isString} from './predicate'
import {includedInBy} from './comparator'
import {drop, reduce1} from './array'

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

const intersectionBy =
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


const uniteBy = (compare?: Comparator) => <A>(as1: Array<A>) =>
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
export function intersection<A>(comparator: Comparator, aas: Array<Array<A>>): Array<A>;
export function intersection<A>(a, b?) {

    const comp =
        isFunction(a)
            ? a
            : undefined;

    const aas =
        isFunction(a)
            ? b
            : a;

    if (isEmpty(aas)) return []
    return isString(aas[0])
        ? (intersectionBy(comp)((aas as any).map((as: any) => as.split('')))).join('')
        : intersectionBy(comp)(aas as any)
}


export function intersect(set1: string): (as2: string) => string
export function intersect<A>(set1: Array<A>): (set2: Array<A>) => Array<A>
export function intersect<A>(comp: Comparator, set1: Array<A>): (set2: Array<A>) => Array<A>
export function intersect(...sets: string[]): string
export function intersect<A>(...sets: Array<Array<A>>): Array<A>
export function intersect<A>(...args): any {

    if (args.length > 1 && isFunction(args[0])) {
       return intersectBy(args[0])(args[1]);
    }

    const sets = args;
    if (sets.length === 0) throw 'illegal argument - intersect expects at least one argument in first parameter list'

    const inner = set1 => set2 =>
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
export function union<A>(comp: Comparator, aas: Array<Array<A>>): Array<A>
export function union<A>(...args) {

    if (args.length > 1 && isFunction(args[0])) {
        return unionBy(args[0])(args[1]);
    }

    const aas = args[0];
    if (isEmpty(aas)) return [];
    return isString(aas[0])
        ? (unionBy()((aas as any).map((as: any) => as.split('')))).join('')
        : unionBy()(aas as any)
}


export function unite(as1: string): (as2: string) => string;
export function unite<A>(as1: Array<A>): (as2: Array<A>) => Array<A>;
export function unite<A>(comp: Comparator, as1: Array<A>): (as2: Array<A>) => Array<A>;
export function unite<A>(...args) {

    if (args.length > 1 && isFunction(args[0])) {
        return uniteBy(args[0])(args[1]);
    }

    const as1 = args[0];
    return (as2: Array<A>|string) => {

        return isString(as1) || isString(as2)
            ? (uniteBy()((as1 as any).split(''))((as2 as any).split(''))).join('')
            : uniteBy()(as1 as any)(as2 as any) as any
    }
}


// Generate a new list with elements which are contained in as but not in subtrahend
export function subtract(as1: string): (as2: string) => string
export function subtract<A>(as1: Array<A>): (as2: Array<A>) => Array<A>
export function subtract<A>(comp: Comparator, as1: Array<A>): (as2: Array<A>) => Array<A>
export function subtract<A>(...args) {

    if (args.length > 1 && isFunction(args[0])) {
        return subtractBy(args[0])(args[1]);
    }

    const as1 = args[0];

    return (as2: Array<A>|string) => {

        return isString(as1) || isString(as2)
            ? (subtractBy()((as1 as any).split(''))((as2 as any).split(''))).join('')
            : subtractBy()(as1 as any)(as2 as any) as any
    }
}


export function set(as: string): string
export function set<A>(as: Array<A>): Array<A>
export function set<A>(comp: Comparator, as: Array<A>): Array<A>
export function set<A>(...args) {

    if (args.length > 0 && isFunction(args[0])) {
        return setBy(args[0])(args[1])
    }

    const as = args[0]

    if (isEmpty(as)) return []

    return isString(as)
        ? (setBy()((as as any).split(''))).join('')
        : setBy()(as as any)
}
