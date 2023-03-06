import {Comparator, ComparatorProducer, Pair, Predicate, Path, Mapping, Map} from './type'
import {and, isEmpty, isArray, isArray2, isAssociative, isFunction, isNot, isNumber, isObject, isPrimitive, isString, or, not} from './predicate'
import {to} from './struct'
import {conds, flow, otherwise, throws} from './composition'
import {size, map, $remove} from './associative'
import {reverse} from './array'
import {zip} from './array'
import { identity, throwIllegalArgs } from './core'
import {subtract} from './set'



// ------------ @author Daniel de Oliveira -----------------


/**
 * tsfun | is
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/reference/gt.spec.ts
 */
 export function is<A>(a: A) {

    return (b: A) => a === b
}


/**
 * tsfun | isnt
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/reference/isnt.spec.ts
 */
export const isnt = <A>(l: A) => isNot(is(l))


/**
 * tsfun | gt
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/number/gt.spec.ts
 */
export function gt(than: number) {
    if (!isNumber(than)) throwIllegalArgs('gt', 'number', than)
    return (that: number) => {
        if (!isNumber(that)) throwIllegalArgs('gt', 'number', that)
        return that > than
    }
}


/**
 * tsfun | lt
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/number/lt.spec.ts
 */
export function lt(than: number) {
    if (!isNumber(than)) throwIllegalArgs('lt', 'number', than)
    return (that: number) => {
        if (!isNumber(that)) throwIllegalArgs('lt', 'number', that)
        return that < than
    }
}


/**
 * tsfun | gte
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/number/gte.spec.ts
 */
export function gte(than: number) {
    if (!isNumber(than)) throwIllegalArgs('gte', 'number', than)
    return (that: number) => {
        if (!isNumber(that)) throwIllegalArgs('gte', 'number', that)
        return that >= than
    }
}


/**
 * tsfun | lte
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/number/lte.spec.ts
 */
export function lte(than: number): (that: number) => boolean
export function lte(than: number) {
    if (!isNumber(than)) throwIllegalArgs('lte', 'number', than)
    return (that: number) => {
        if (!isNumber(that)) throwIllegalArgs('lte', 'number', that)
        return that <= than
    }
}


const compare = (acomparator: Comparator, ocomparator: Comparator) => (l: any) =>
    (r: any): boolean => {

        // Array
        if (isArray(l) && isArray(r)) return acomparator(l)(r)

        // {} or Object
        if (isObject(l) && isObject(r)) {
            if (!sameset(Object.keys(l))(Object.keys(r))) return false // TODO review, ocomparator could be something which allows for keys to be different
            return ocomparator(l)(r)
        }

        if (l instanceof Object && r instanceof Object) {
            // for example Date, Map
            throwIllegalArgs('compare', 'not a class instance', JSON.stringify(l) + ':' + JSON.stringify(r))
        }

        return typeof l === typeof r && l === r
    }


const c = (acomparator: Comparator, ocomparator: Comparator) => (l: any) =>
    (r: any): boolean => compare(acomparator, ocomparator)(l)(r)


/**
 * tsfun | on
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/on.spec.ts
 */
export function on<T1, T2>(mapping: Mapping<T1,T2>): Comparator<T1>
export function on<T1, T2>(mapping: Mapping<T1,T2>, comparator: Comparator<T2,T2>): Comparator
export function on<T1, T2>(mapping: Mapping<T1,T2>, predicate: Predicate<T2>): Predicate
export function on<T1,T2>(mapping: Mapping<T1,T2>, value: T2): Predicate<T1>
export function on<T>(path: Path): Comparator<T>
export function on<T1,T2>(path: Path, precicate: Predicate<T1>): Predicate<T2>
export function on<T1,T2>(path: Path, comparator: Comparator<T1,T2>): Comparator<T1,T2>
export function on<T1,T2>(path: Path, value: T1): Predicate<T2>
export function on(path, compare?) {

    return flow(
        path,
        conds(
            or(and(isString, not(isEmpty)), isNumber, isArray2),
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
                        ? isFunction(compare(mapping(l)))
                            ? r => compare(mapping(l))(mapping(r))
                            : compare(mapping(l))
                        : is(compare)(mapping(l)))
}


/**
 * tsfun | onBy
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/struct/on.spec.ts
 */
export function onBy<T1,T2>(compare: (l: T1) => (r: T2) => boolean): (path: Path|Mapping, cmp?: T1) => (l: T1) => (r: T2) => boolean;
export function onBy(compare) {

    return (path, cmp) => {

        if (cmp !== undefined && !isFunction(cmp)) return on(path, compare(cmp))
        else return (on as any)(path, compare)
    }
}


export const by = <A>(p: Predicate<A>) => p


/**
 * tsfun | differentFrom
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/reference/different_from.spec.ts
 */
export function differentFrom(comp: Comparator, that: any): (_: any) => boolean
export function differentFrom(comp: Comparator): (that: any) => (_: any) => boolean
export function differentFrom(comp: Comparator, that: any, _: any): boolean
export function differentFrom(that: any): (_: any) => boolean
export function differentFrom(...args) {

    const $: ComparatorProducer = (compare: Comparator) => <A>(a:A) =>
        isNot(compare(a))

    if (args.length === 3) return $(args[0])(args[1])(args[2])

    if (args.length === 1 && isFunction(args[0])) return $(args[0])

    if (args.length > 0 && isFunction(args[0])) {
        return $(args[0])(args[1])
    }

    const that = args[0]
    return $(is)(that)
}


/**
 * tsfun | includedIn
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/set/includedIn.spec.ts
 */
export function includedIn<A>(as: Array<A>): (a: A) => boolean
export function includedIn<A>(comp: Comparator): (as: Array<A>) => (a: A) => boolean
export function includedIn<A>(comp: Comparator, as: Array<A>): (a: A) => boolean
export function includedIn<A>(comp: Comparator, as: Array<A>, a: A): boolean
export function includedIn<A>(...args): any {

    const $ = (compare: Comparator) => <A>(as: Array<A>) =>
        (a: A): boolean => {

            if (!isArray(as)) throwIllegalArgs('includedIn', 'Array', as)

            return compare === undefined ? includes(a)(as) : includes(compare)(a)(as)
        }

    if (args.length === 3) return $(args[0])(args[1])(args[2])

    if (args.length === 1 && isFunction(args[0])) {
        return $(args[0])
    }

    if (args.length > 1 && isFunction(args[0])) {
        return $(args[0])(args[1])
    }

    const as = args[0]

    return (a: A) => {

        if (isArray(as)) {

            return $(is)(as as any)(a)

        } else {

            throwIllegalArgs('includedIn', 'Array', as)
        }
    }
}


/**
 * tsfun | includes
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/set/includes.spec.ts
 */
export function includes<A>(comp: Comparator, a: A, as: Array<A>): boolean
export function includes<A>(comp: Comparator, a: A): (as: Array<A>) => boolean
export function includes<A>(comp: Comparator): (a: A) => (as: Array<A>) => boolean
export function includes<A>(a: A): (as: Array<A>) => boolean
export function includes<A>(...args): any {

    const $ =
        (compare: Comparator = is) =>
            <A>(a: A) => (as: Array<A>) =>
                as.filter(compare(a)).length > 0


    if (args.length === 3) return $(args[0])(args[1])(args[2])

    if (args.length === 1 && isFunction(args[0])) {
        return $(args[0])
    }

    if (args.length > 1 && isFunction(args[0])) {
        return $(args[0])(args[1])
    }

    const a = args[0]

    return (as: Array<A>) => {

        if (isArray(as)) {

            return $(is)(a)(as)

        } else {

            throwIllegalArgs('includes', 'Array', as)
        }
    }
}




/**
 * tsfun | same
 *
 * ```
 * same([1, 2], [1, 2])
 * >> true
 * same([1, 2])([1, 2]) // curried
 * >> true
 * same(sameset, [[2, 1], [3]], [[1, 2], [3]]) // choose a custom comparator to compare elements
 * >> true
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/struct/object_equal.spec.ts
 */
 export function same<T>(comp: Comparator, o1: Array<T>): (o2: Array<T>) => boolean
 export function same(comp: Comparator): <T>(o1: Array<T>) => (o2: Array<T>) => boolean
 export function same<T>(comp: Comparator, o1: Array<T>, o2: Array<T>): boolean
 export function same<T>(o1: Array<T>, o2: Array<T>): boolean
 export function same<T>(o1: Array<T>): (o2: Array<T>) => boolean
 export function same(...args): any {

    const FNAME = 'same'

    function guard(l, r) {
        if (!isArray(l)) throwIllegalArgs(FNAME, 'Array', l)
        if (!isArray(r)) throwIllegalArgs(FNAME, 'Array', r)
    }

    function $(comparator, l, r) {
        guard(l, r)
        return l.length !== r.length
            ? false
            : l
                .filter((a, i) => cmp(FNAME, comparator, a, r[i]))
                .length === r.length
    }

    if (args.length === 0) throwIllegalArgs(FNAME, 'args not empty')
    if (isFunction(args[0])) {
        if (args.length === 1) return l => r => same(args[0], l, r)
        if (args.length === 2) return r => same(args[0], args[1], r)
    } else {
        if (args.length === 1) return r => same(is, args[0], r)
        if (args.length === 2) return same(is, args[0], args[1])
    }
    const [comparator, l, r] = [args[0], args[1], args[2]]
    guard(l, r)

    return $(comparator, l, r)
 }


/**
 * tsfun | samemap
 *
 * ```
 * samemap({a: 1, b: 2}, {b: 2, a: 1})
 * >> true
 * samemap({a: 1, b: 2})({b: 2, a: 1}) // curried
 * >> true
 * samemap(sameset, {a: [1, 2]}, {a: [2, 1]}) // choose a custom comparator to compare elements
 * >> true
 * samemap(sameset, {a: [1, 2]})({a: [2, 1]}) // curried
 * >> true
 * samemap(sameset)({a: [1, 2]})({a: [2, 1]}) // fully curried
 * >> true
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/map/samemap.spec.ts
 */
export function samemap<T>(comp: Comparator, o1: Map<T>): (o2: Map<T>) => boolean
export function samemap(comp: Comparator): <T>(o1: Map<T>) => (o2: Map<T>) => boolean
export function samemap<T>(comp: Comparator, o1: Map<T>, o2: Map<T>): boolean
export function samemap<T>(o1: Map<T>, o2: Map<T>): boolean
export function samemap<T>(o1: Map<T>): (o2: Map<T>) => boolean
export function samemap(...args): any {

    const FNAME = 'samemap'

    function guard(l, r) {
        if (!isObject(l)) throwIllegalArgs(FNAME, 'Map', l)
        if (!isObject(r)) throwIllegalArgs(FNAME, 'Map', r)
    }

    function $(comparator, l, r) {
        if (!sameset(Object.keys(l), Object.keys(r))) return false
        guard(l, r)
        return Object
            .keys(l)
            .filter(key => comparator((l as any)[key])((r as any)[key]))
            .length === Object.keys(l).length
    }

    // TODO factor out code common with same()
    if (args.length === 0) throwIllegalArgs(FNAME, 'args not empty')
    if (isFunction(args[0])) {
        if (args.length === 1) return l => r => samemap(args[0], l, r)
        if (args.length === 2) return r => samemap(args[0], args[1], r)
    } else {
        if (args.length === 1) return r => samemap(is, args[0], r)
        if (args.length === 2) return samemap(is, args[0], args[1])
    }
    const [comparator, l, r] = [args[0], args[1], args[2]]
    guard(l, r)

    return $(comparator, l, r)
}



/**
 * tsfun | sameset
 * Compares 2 arrays where elements order does not matter
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/set/sameset.spec.ts
 */
export function sameset<A>(that: Array<A>): (as2: Array<A>) => boolean
export function sameset<A>(comp: Comparator, that: Array<A>): (as2: Array<A>) => boolean
export function sameset<A>(comp: Comparator): (that: Array<A>) => (as2: Array<A>) => boolean
export function sameset<A>(that: Array<A>, as2: Array<A>): boolean
export function sameset<A>(comp: Comparator, that: Array<A>, as2: Array<A>): boolean
export function sameset<A>(...args): any {

    const $ =
        (comparator?: Comparator) =>
            <A>(as1: Array<A>) =>
                (as2: Array<A>) => {

                    const c1: any = subtract(comparator ?? is);
                    return c1(as1)(as2).length === 0
                        && c1(as2)(as1).length === 0
                }

    if (args.length === 1 && isFunction(args[0])) {
        return as1 => sameset(args[0], as1)
    }

    if (args.length > 1 && isFunction(args[0])) {

        return args.length === 2
            ? $(args[0])(args[1])
            : $(args[0])(args[1])(args[2])
    }

    const that = args[0]
    const as2  = args.length > 1 ? args[1] : undefined

    const inner = (as2: Array<A>|string) => {

        if (isArray(that) && isArray(as2)) {

            return $(undefined as any)(that)(as2)

        } else {

            throwIllegalArgs('sameset', 'Arrays', [that, as2])
        }
    }

    return as2 === undefined
        ? inner
        : inner(as2)
}


/**
 * tsfun | subsetOf
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/set/subset_of.spec.ts
 */
export function subsetOf<A>(comp: Comparator, that: Array<A>): (as2: Array<A>) => boolean
export function subsetOf<A>(comp: Comparator): (that: Array<A>) => (as2: Array<A>) => boolean
export function subsetOf<A>(that: Array<A>): (as2: Array<A>) => boolean
export function subsetOf<A>(that: Array<A>, as2: Array<A>): boolean
export function subsetOf<A>(comp: Comparator, that: Array<A>, as2: Array<A>): boolean
export function subsetOf(...args): any {

    const $ = (compare: Comparator) => <A>(superset: Array<A>) =>
        (subset: Array<A>): boolean => {

            if (!isArray(subset) || !isArray(superset))
                throwIllegalArgs('subsetOf', 'Arrays', [superset, subset])

            return subset
                .filter(compare === undefined ? includedIn(superset) : includedIn(compare)(superset))
                .length === subset.length
        }

    if (args.length === 1 && isFunction(args[0])) {
        return as => subsetOf(args[0], as)
    }

    if (args.length > 1 && isFunction(args[0])) {
        return args.length === 2
            ? $(args[0])(args[1])
            : $(args[0])(args[1])(args[2])
    }

    const that = args[0]
    const as2 = args[1]

    const inner = (as2: any): any => {

        if (isArray(that) && isArray(as2)) {

            return $(undefined as any)(that as any)(as2 as any)

        } else {

            throwIllegalArgs('subsetOf', 'Arrays', [that, as2])
        }
    }

    return as2 === undefined
        ? inner
        : inner(as2)
}


/**
 * tsfun | supersetOf
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/set/superset_of.spec.ts
 */
export function supersetOf<A>(that: Array<A>): (as2: Array<A>) => boolean
export function supersetOf<A>(that: Array<A>, as2: Array<A>): boolean
export function supersetOf<A>(comp: Comparator, that: Array<A>, as2: Array<A>): boolean
export function supersetOf<A>(comp: Comparator, that: Array<A>): (as2: Array<A>) => boolean
export function supersetOf<A>(comp: Comparator): (that: Array<A>) => (as2: Array<A>) => boolean
export function supersetOf(that: any, as2?: any, as3?: any): any {

    const $$ = (compare: Comparator) => <A>(subset: Array<A>) =>
        (superset: Array<A>): boolean => compare === undefined ? subsetOf(superset)(subset) : subsetOf(compare)(superset)(subset)

    const $ = (comparator?) => (that) => (as2: any): any => {

        if (isArray(that) && isArray(as2)) {

            return $$(comparator)(that as any)(as2 as any)

        } else {

            throwIllegalArgs('supersetOf', 'Arrays', [that, as2])
        }
    }

    if (isFunction(that)) {

        if (as2 && as3) return $(that)(as2)(as3)

        return as2
            ? as => $(that)(as2)(as)
            : $(that)
    }

    return as2 === undefined
        ? $(undefined)(that)
        : $(undefined)(that)(as2)
}


/**
 * tsfun | equal
 *
 * Compares any two Structs, where [] is interpreted
 * as Tuple (small Array of heterogeneous items. where order matters)
 * and {} as Record (small object with heterogenous values).
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/struct/equal.spec.ts
 */
export function equal<T>(o1: Array<T>): (o2: Array<T>) => boolean
export function equal<T>(o1: Map<T>): (o2: Map<T>) => boolean
export function equal<T>(o1: Array<T>, o2: Array<T>): boolean
export function equal<T>(o1: Map<T>, o2: Map<T>): boolean
export function equal(...args): any {

    const $ = l => r => {

        if (isArray(l)&&isArray(r)) return same($, l, r)
        if (isObject(l)&&isObject(r)) return samemap($, l, r)

        if (!isAssociative(l)&&!isPrimitive(l)) throwIllegalArgs('equal', 'Associative or Primitive', l)
        if (!isAssociative(r)&&!isPrimitive(r)) throwIllegalArgs('equal', 'Associative or Primitive', r)

        return typeof l === typeof r && l === r
    }

    if (args.length === 2 && isPrimitive(args[0]) && isPrimitive(args[1])) {
        return args[0] === args[1]
    }
    if (args.length === 1) return r => equal(args[0], r)
    if (!isAssociative(args[0])) throwIllegalArgs('equal', 'Associative', args[0])
    if (!isAssociative(args[1])) throwIllegalArgs('equal', 'Associative', args[1])

    return args[0] !== undefined && args[1] !== undefined
        ? $(args[0])(args[1])
        : args[0] !== undefined
            ? $(args[0])
            : $
}


/**
 * tsfun | startsWith
 *
 * ```
 * startsWith([1, 2, 3], [1, 2, 3, 4]) // uncurried
 * >> true
 * startsWith([1, 2, 3])([1, 2, 3, 4]) // curried
 * >> true
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/list/starts_with.spec.ts
 */
export function startsWith<A>(as1: Array<A>, as2: Array<A>): boolean
export function startsWith<A>(as1: Array<A>): (as2: Array<A>) => boolean
export function startsWith<A>(comp: Comparator, as1: Array<A>): (as2: Array<A>) => boolean
export function startsWith<A>(comp: Comparator): (as1: Array<A>) => (as2: Array<A>) => boolean
export function startsWith<A>(comp: Comparator, as1: Array<A>, as2: Array<A>): boolean
export function startsWith<A>(...args) {

    const $ = (comparator) => (that: Array<A>) => (as: Array<A>) => {

        if (that && !isArray(that)) throwIllegalArgs('startsWith', 'Array', that)
        if (as && !isArray(as)) throwIllegalArgs('startsWith', 'Array', as)

        return that.length > as.length
            ? false
            : flow(
                [as as Array<A>, that as Array<A>],
                zip(),
                $remove(comparePair(comparator)),
                size,
                is(0))
    }

    return exec($, 'startsWith', ...args)
}


/**
 * tsfun | endsWith
 *
 * ```
 * endsWith([2, 3, 4])([1, 2, 3, 4])
 * >> true
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/comparator/list/ends_with.spec.ts
 */
export function endsWith<A>(as1: Array<A>, as2: Array<A>): boolean
export function endsWith<A>(as1: Array<A>): (as2: Array<A>) => boolean
export function endsWith<A>(comp: Comparator, as1: Array<A>): (as2: Array<A>) => boolean
export function endsWith<A>(comp: Comparator): (as1: Array<A>) => (as2: Array<A>) => boolean
export function endsWith<A>(comp: Comparator, as1: Array<A>, as2: Array<A>): boolean
export function endsWith(...args) {

    const $ = (comparator) => that => as => {

        if (that && !isArray(that)) throwIllegalArgs('endsWith', 'Array', that)
        if (as && !isArray(as)) throwIllegalArgs('endsWith', 'Array', as)

        return that.length > as.length
            ? false
            : flow(
                [ as, that ],
                map(reverse),
                zip(),
                $remove(comparePair(comparator)),
                size,
                is(0))
    }

    return exec($, 'endsWith', ...args)
}


const comparePair = (cmp?) => <A>([a, b]: Pair<A>) => cmp ? cmp(a)(b) : a === b


function exec($, name, ...args) {

    const [comp, that, as] =
        args.length === 3
        ? [args[0], args[1], args[2]]
        : args.length === 2
        ? isFunction(args[0])
            ? [args[0], args[1], undefined]
            : [undefined, args[0], args[1]]
        : isFunction(args[0])
            ? [args[0], undefined, undefined]
            : [undefined, args[0], undefined]

    if (that && !isArray(that)) throwIllegalArgs(name, 'Array', that)
    if (as && !isArray(as)) throwIllegalArgs(name, 'Array', as)

    return that && as
        ? $(comp)(that)(as)
        : that
            ? $(comp)(that)
            : $(comp)
}


function cmp(fname, comparator, l, r) {

    if (!comparator) return l === r

    if (isArray(l)&&isArray(r)) return comparator(l)(r)
    if (isObject(l)&&isObject(r)) return comparator(l)(r)

    if (!isPrimitive(l)&&!isAssociative(l)) throwIllegalArgs(fname, 'Primitive or Associative', l)
    if (!isPrimitive(r)&&!isAssociative(r)) throwIllegalArgs(fname, 'Primitive or Associative', r)

    return typeof l === typeof r && l === r
}
