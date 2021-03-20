import {Comparator, ComparatorProducer, List, Pair, Predicate, Path, Mapping} from './type'
import {and, empty, isArray, isArray2, isFunction, isNot, isNumber, isObject, isString, or} from './predicate'
import {subtractBy} from './set'
import {$getElForPathIn, to} from './struct'
import {conds, flow, otherwise, throws} from './composition'
import {remove, size} from './collection'
import {reverse} from './list'
import {map, zip} from './array'
import { identity } from './core'



// ------------ @author Daniel de Oliveira -----------------


export function tripleEqual<A>(l:A) {

    return (r: A) => l === r
}


export function greaterThan(than: number): (that: number) => boolean
export function greaterThan(than: string): (that: string) => boolean
export function greaterThan(than: number|string) {

    return (that: number|string) => {

        if (isString(than) && (than as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1'
        }
        if (isString(that) && (that as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1'
        }
        if ((isString(that) && !isString(than)) || (isString(than) && !isString(that))) {
            throw 'illegal argument - either both arguments must be number or both arguments must be string'
        }

        return that > than
    }
}


export function lessThan(than: number): (that: number) => boolean
export function lessThan(than: string): (that: string) => boolean
export function lessThan(than: number|string) {

    return (that: number|string) => {

        if (isString(than) && (than as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1'
        }
        if (isString(that) && (that as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1'
        }
        if ((isString(that) && !isString(than)) || (isString(than) && !isString(that))) {
            throw 'illegal argument - either both arguments must be number or both arguments must be string'
        }

        return that < than
    }
}


export function greaterOrEqualThan(than: number): (that: number) => boolean
export function greaterOrEqualThan(than: string): (that: string) => boolean
export function greaterOrEqualThan(than: number|string) {

    return (that: number|string) => {

        if (isString(than) && (than as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1'
        }
        if (isString(that) && (that as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1'
        }
        if ((isString(that) && !isString(than)) || (isString(than) && !isString(that))) {
            throw 'illegal argument - either both arguments must be number or both arguments must be string'
        }

        return that >= than
    }
}


export function lessOrEqualThan(than: number): (that: number) => boolean
export function lessOrEqualThan(than: string): (that: string) => boolean
export function lessOrEqualThan(than: number|string) {

    return (that: number|string) => {

        if (isString(than) && (than as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1'
        }
        if (isString(that) && (that as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1'
        }
        if ((isString(that) && !isString(than)) || (isString(than) && !isString(that))) {
            throw 'illegal argument - either both arguments must be number or both arguments must be string'
        }

        return that <= than
    }
}


export function is<A>(a: A) {

    return tripleEqual(a)
}


export const isnt = <A>(l: A) => isNot(tripleEqual(l))


export function jsonEqual<A>(l: A): (r: A) => boolean
export function jsonEqual<A>(l: A, r: A): boolean
export function jsonEqual(l: any, ...r: any[]): any {
    if (r.length > 1) throw 'illegal argument - first param list in jsonEqual can have at most 2 arguments'
    const inner = (r: any) => tripleEqual(JSON.stringify(l))(JSON.stringify(r))
    return r.length === 0
        ? inner
        : inner(r[0])
}


const differentFromBy: ComparatorProducer = (compare: Comparator) => <A>(a:A) =>
    isNot(compare(a))


export const includedInBy = (compare: Comparator) => <A>(as: Array<A>) =>
    (a: A): boolean => {

        if (!isArray(as)) throw 'illegal argument - includedInBy: expected an Array'

        return includesBy(compare)(a)(as)
    }


export const includesBy =
    (compare: Comparator = tripleEqual as any) =>
        <A>(a: A) => (as: Array<A>) =>
            as.filter(compare(a)).length > 0


export const subsetOfBy = (compare: Comparator) => <A>(superset: Array<A>) =>
    (subset: Array<A>): boolean => {

        if (!isArray(subset) || !isArray(superset))
            throw 'illegal argument - containedInBy: expected Arrays'

        return subset
            .filter(includedInBy(compare)(superset))
            .length === subset.length
    }


export const supersetOfBy = (compare: Comparator) => <A>(subset: Array<A>) =>
    (superset: Array<A>): boolean => subsetOfBy(compare)(superset)(subset)


const compare = (acomparator: Comparator, ocomparator: Comparator) => (l: any) =>
    (r: any): boolean => {

        // Array
        if (isArray(l) && isArray(r)) return acomparator(l)(r)

        // {} or Object
        if (isObject(l) && isObject(r)) {
            if (!samesetBy(undefined as any)(Object.keys(l))(Object.keys(r))) return false
            return ocomparator(l)(r)
        }

        return l instanceof Object && r instanceof Object

            // for example Date, Map
            ? jsonEqual(l)(r)

            // numbers, strings
            : typeof l === typeof r && l === r
    }


const c = (acomparator: Comparator, ocomparator: Comparator) => (l: any) =>
    (r: any): boolean => compare(acomparator, ocomparator)(l)(r)


export const arrayEqualBy = (objectComparator?: Comparator) =>
    <A>(as1: Array<A>) => (as2: Array<A>): boolean => {

        const ocmp = objectComparator ? objectComparator : objectEqualBy(arrayEqualBy() as any)

        return as1.length !== as2.length
            ? false
            : as1
            .filter((a, i) => compare(equalBy(arrayEqualBy() as any) as any, ocmp)(a)(as2[i]))
            .length === as2.length
    }


// Compares 2 arrays where elements order does not matter
export const samesetBy: (_: Comparator) => any =
    (objectComparator?: Comparator) =>
        <A>(as1: Array<A>) =>
            (as2: Array<A>) => {

                const ocmp = objectComparator ? objectComparator : objectEqualBy(samesetBy(undefined as any))
                const acmp = objectComparator ? samesetBy(ocmp): samesetBy(undefined as any)

                return subtractBy(c(acmp, ocmp))(as1)(as2).length === 0
                    && subtractBy(c(acmp, ocmp))(as2)(as1).length === 0
            }


export const objectEqualBy =
    (arrayComparator: Comparator) =>
        (o1: Object) =>
            (o2: Object): boolean => {

                if (!isObject(o1) || !isObject(o2))
                    throw new TypeError('types do not match objectEqualBy')

                if (!samesetBy(undefined as any)(Object.keys(o1))(Object.keys(o2))) return false

                return Object
                    .keys(o1)
                    .filter(key => {

                        return compare(
                            arrayComparator,
                            objectEqualBy(arrayComparator))
                        ((o1 as any)[key])
                        ((o2 as any)[key])
                    })
                    .length === Object.keys(o1).length
            }


export const equalBy =
    (arrayComparator: Comparator) =>
        o1 => (o2): boolean => 
            compare(arrayComparator,
                objectEqualBy(arrayComparator))(o1)(o2)


export function on<T1, T2>(path: Mapping<T1,T2>): Comparator<T1>
export function on<T1, T2>(path: Mapping<T1,T2>, compare: Comparator<T2,T2>): Comparator<T1, T1>
export function on<T1, T2>(path: Mapping<T1,T2>, compare: Predicate<T2>): Predicate<T1>
export function on<T1,T2>(path: Mapping<T1,T2>, compare: T2): Predicate<T1>
export function on<T>(path: Path): Comparator<T>
export function on<T1,T2>(path: Path, compare: Predicate<T1>): Predicate<T2>
export function on<T1,T2>(path: Path, comparator: Comparator<T1,T2>): Comparator<T1,T2>
export function on<T1,T2>(path: Path, compare: T1): Predicate<T2>
export function on(path, compare?) {

    return flow(
        path, 
        conds(
            or(and(isString, isNot(empty)), isNumber, isArray2),
            to,
            isFunction,
            identity,
            otherwise,
            throws('illegal argument - path must be one of string, number, array of length 2 or function')),
        mapping => 
            l => 
                compare === undefined
                    ? r => mapping(l) === mapping(r)
                    : isFunction(compare)
                        ? isFunction(compare(l))
                            ? r => compare(mapping(l))(mapping(r))
                            : compare(mapping(l))
                        : is(compare)(mapping(l)))
}


export function onBy<T1,T2>(compare: (l: T1) => (r: T2) => boolean): (path: Path|Mapping, cmp?: T1) => (l: T1) => (r: T2) => boolean;
export function onBy(compare) {

    return (path, cmp) => {
        
        if (cmp !== undefined && !isFunction(cmp)) return on(path, compare(cmp))
        else return (on as any)(path, compare)
    }
}


export const by = <A>(p: Predicate<A>) => p


export function differentFrom(comp: Comparator, that: any): (_: any) => boolean
export function differentFrom(that: any): (_: any) => boolean
export function differentFrom(...args) {

    if (args.length > 0 && isFunction(args[0])) {
        return differentFromBy(args[0])(args[1])
    }

    const that = args[0]
    return differentFromBy(tripleEqual as any)(that)
}


export function includedIn(as: string): (a: string) => boolean
export function includedIn<A>(as: Array<A>): (a: A) => boolean
export function includedIn<A>(comp: Comparator, as: Array<A>): (a: A) => boolean
export function includedIn<A>(...args) {

    if (args.length > 1 && isFunction(args[0])) {
        return includedInBy(args[0])(args[1])
    }

    const as = args[0]

    return (a: A) => {

        if (isString(as) && isString(a) && (a as any).length === 1) {

            return includedInBy(tripleEqual as any)((as as any).split(''))(a)

        } else if (isArray(as)) {

            return includedInBy(tripleEqual as any)(as as any)(a)

        } else {

            throw 'illegal argument in includedIn'
        }
    }
}


export function includes(as: string): (a: string) => boolean
export function includes<A>(a: A): (as: Array<A>) => boolean
export function includes<A>(comp: Comparator, a: A): (as: Array<A>) => boolean
export function includes<A>(...args) {

    if (args.length > 1 && isFunction(args[0])) {
        return includesBy(args[0])(args[1])
    }

    const a = args[0]

    return (as: Array<A>|string) => {

        if (isString(as) && isString(a) && (a as any).length === 1) {

            return includesBy(tripleEqual as any)(a)((as as any).split(''))

        } else if (isArray(as)) {

            return includesBy(tripleEqual as any)(a)(as as any)

        } else {

            throw 'illegal argument in includes'
        }
    }
}


export function arrayEqual<A>(comp: Comparator, that: Array<A>): (_: Array<A>) => boolean
export function arrayEqual<A>(that: Array<A>): (_: Array<A>) => boolean
export function arrayEqual<A>(...args) {

    if (args.length > 1 && isFunction(args[0])) {
        return arrayEqualBy(args[0])(args[1])
    }

    const that = args[0]
    return arrayEqualBy(undefined as any)(that)
}


// Compares 2 arrays where elements order does not matter
export function sameset(that: string): (as2: string) => boolean
export function sameset(that: string, as2: string):  boolean
export function sameset<A>(that: Array<A>): (as2: Array<A>) => boolean
export function sameset<A>(comp: Comparator, that: Array<A>): (as2: Array<A>) => boolean
export function sameset<A>(that: Array<A>, as2: Array<A>): boolean
export function sameset<A>(comp: Comparator, that: Array<A>, as2: Array<A>): boolean
export function sameset<A>(...args): any {

    if (args.length > 1 && isFunction(args[0])) {

        return args.length === 2
            ? samesetBy(args[0])(args[1])
            : samesetBy(args[0])(args[1])(args[2])
    }

    const that = args[0]
    const as2  = args.length > 1 ? args[1] : undefined

    const inner = (as2: Array<A>|string) => {

        if (isString(that) && isString(as2)) {

            return samesetBy(undefined as any)((that as any).split(''))((as2 as any).split(''))

        } else if (isArray(that) && isArray(as2)) {

            return samesetBy(undefined as any)(that)(as2)

        } else {

            throw 'illegal argument - arguments must be either both arrays or both strings'
        }
    }

    return as2 === undefined
        ? inner
        : inner(as2)
}


export function subsetOf<A>(comp: Comparator, that: Array<A>|string): {
    (as2: string): boolean
    (as2: Array<A>): boolean
}
export function subsetOf<A>(that: Array<A>|string): {
    (as2: string): boolean
    (as2: Array<A>): boolean
}
export function subsetOf<A>(that: Array<A>, as2: Array<A>): boolean
export function subsetOf<A>(comp: Comparator, that: Array<A>, as2: Array<A>): boolean
export function subsetOf<A>(...args): any {

    if (args.length > 1 && isFunction(args[0])) {
        return args.length === 2
            ? subsetOfBy(args[0])(args[1])
            : subsetOfBy(args[0])(args[1])(args[2])
    }

    const that = args[0]
    const as2 = args[1]

    const inner = (as2: any): any => {

        if (isString(that) && isString(as2)) {

            return subsetOfBy(undefined as any)((that as any).split(''))((as2 as any).split(''))

        } else if (isArray(that) && isArray(as2)) {

            return subsetOfBy(undefined as any)(that as any)(as2 as any)

        } else {

            throw 'illegal argument - arguments must be either both arrays or both strings'
        }
    }

    return as2 === undefined
        ? inner
        : inner(as2)
}



export function supersetOf<A>(that: Array<A>|string): {
    (as2: string): boolean
    (as2: Array<A>): boolean
}
export function supersetOf<A>(that: string, as2: string): boolean
export function supersetOf<A>(that: Array<A>, as2: Array<A>): boolean
export function supersetOf<A>(that: any, as2?: any): any {

    const inner = (as2: any): any => {

        if (isString(that) && isString(as2)) {

            return supersetOfBy(undefined as any)((that as any).split(''))((as2 as any).split(''))

        } else if (isArray(that) && isArray(as2)) {

            return supersetOfBy(undefined as any)(that as any)(as2 as any)

        } else {

            throw 'illegal argument - arguments must be either both arrays or both strings'
        }
    }

    return as2 === undefined
        ? inner
        : inner(as2)
}


export function objectEqual(comp: Comparator, o1: Object): (o2: Object) => boolean
export function objectEqual(o1: Object): (o2: Object) => boolean
export function objectEqual(...args) {

    if (args.length > 0 && isFunction(args[0])) {
        return objectEqualBy(args[0])(args[1])
    }

    const o1 = args[0]
    return objectEqualBy(arrayEqual as any)(o1)
}


export function equal(o1: undefined, o2: undefined): true
export function equal(comp: Comparator, o1: undefined, o2: undefined): true
export function equal<T>(comp: Comparator, o1: T, o2: T): boolean
export function equal(comp: Comparator, o1: undefined): {
    (o2: undefined): true
    (o2: any): false
}
export function equal<T>(comp: Comparator, o1: T): (o2: T) => boolean
export function equal<T>(o1: T, o2: T): boolean
export function equal(o1: undefined): {
    (o2: undefined): true
    (o2: any): false
}
export function equal<T>(o1: T): (o2: T) => boolean
export function equal(o1: any, ...os: any[]): any {

    if (isFunction(o1)) {
        return (os.length === 1)
            ? equalBy(o1)(os[0])
            : equalBy(o1)(os[0])(os[1])
    }


    if (os.length > 1) throw 'illegal argument - equal expects 1 or 2 arguments in first parameter list'
    return os.length === 0
        ? (o2: any) => equalBy(arrayEqual as any)(o2)(o1)
        : equalBy(arrayEqual as any)(os[0])(o1)
}


export function equalTo(o1: any) {

    return equal(o1)
}


export function startsWith<A>(s1: string, s2: string): boolean
export function startsWith<A>(s1: string): (s2: string) => boolean
export function startsWith<A>(as1: Array<A>, as2: Array<A>): boolean
export function startsWith<A>(as1: Array<A>): (as2: Array<A>) => boolean
export function startsWith<A>(that: string|Array<A>, what?:string|Array<A>) {

    const compare = (that: string|Array<A>, what: string|Array<A>) => {

        if (isString(what) && isString(that)) {

            return (what as any).startsWith(that)

        } else if (isArray(what) && isArray(that)) {

            return that.length > what.length
                ? false
                : flow(
                    [what as Array<A>, that as Array<A>],
                    zip(),
                    remove(pairIsSame),
                    size,
                    is(0))

        } else {

            throw 'illegal argument - args must be either both strings or both arrays'
        }
    }

    return what === undefined
        ? (what: string|Array<A>) => compare(that, what)
        : compare(that, what)
}


const pairIsSame = <A>([a, b]: Pair<A, A>) => a === b


export function endsWith<A>(s1: string, s2: string): boolean
export function endsWith<A>(s1: string): (s2: string) => boolean
export function endsWith<A>(as1: Array<A>, as2: Array<A>): boolean
export function endsWith<A>(as1: Array<A>): (as2: Array<A>) => boolean
export function endsWith<A>(that, as2?) {

    const inner = what => {

        if (isString(what) && isString(that)) {

            return what.endsWith(that)

        } else if (isArray(what) && isArray(that)) {

            return that.length > what.length
                ? false
                : flow(
                    [ what as Array<A>, that as Array<A> ],
                    map(reverse),
                    zip(),
                    remove(pairIsSame),
                    size,
                    is(0))

        } else {

            throw 'illegal argument - args must be either both strings or both arrays'
        }
    }

    return as2 === undefined
        ? inner
        : inner(as2)
}



export function longerThan<T>(than: List<T>) {

    return (what: List<T>) => what.length > than.length
}


export function shorterThan<T>(than: List<T>) {

    return (what: List<T>) => what.length < than.length
}


export function sameLength<T>(as: List<T>) {

    return (what: List<T>) => what.length === as.length
}


function isNotEmpty(isString: <T = any>(t: string | T) => t is string, isNotEmpty: any) {
    throw new Error('Function not implemented.')
}

