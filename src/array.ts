import {
    isArray,
    isEmpty, isFunction, isNot,
    isNumber,
    isObject,
    isString,
    isUndefined
} from './predicate'
import {identity, throwIllegalArgs} from './core'
import {Associative, Mapping, Pair, Predicate} from './type'
import {values, size, copy, $filter, $remove, count} from './associative'
import {Map} from './type'
import { flow, val } from './composition'


/**
 * tsfun | flatMap
 *
 * Maps an Array to an Array of Arrays and then flattens them.
 *
 * ```
 * >> flatMap((x: string) => x.split(' '))(['a b', 'c d'])
 * ['a', 'b', 'c', 'd']
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/flat_map.spec.ts
 */
export function flatMap<A,B>(as: Array<A>, f: (_: A) => Array<B>): Array<B>
export function flatMap<A,B>(f: (_: A) => Array<B>, as: Array<A>): Array<B>
export function flatMap<A,B>(f: (_: A) => Array<B>): (as: Array<A>) => Array<B>
export function flatMap<A,B>(arg, arg2?): any {

    const intoArrayWith = <A>(f: (_: A) => Array<A>) =>
        (acc: Array<A>, val: A) => acc.concat(f(val))

    const $ = f => as =>
            (as.length < 1
                ? []
                : as.reduce(intoArrayWith(f as any),[]))

    return arg2 === undefined
        ? !isFunction(arg)
            ? throwIllegalArgs('flatMap', 'Mapping', arg)
            : $(arg)
        : isFunction(arg)&&isArray(arg2)
        ? $(arg)(arg2)
        : isArray(arg)&&isFunction(arg2)
        ? $(arg2)(arg)
        : throwIllegalArgs('flatMap', 'Array and Mapping in either order', JSON.stringify(arg) + ':' + JSON.stringify(arg2))
}


// see https://mail.mozilla.org/pipermail/es-discuss/2012-April/022273.html
/**
 * tsfun | dense
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/dense.spec.ts
 */
export function dense(size: number) {

    return Array.apply(null, Array(size))
}


/**
 * tsfun | range
 *
 * ```
 * >> range(1,3)
 * [1,2]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/range.spec.ts
 */
export function range(a: number, b?: number, stepSize: number = 1): number[] {

    let begin: number|undefined = undefined
    let end:   number|undefined = undefined

    if (b === undefined) {
        end = a
        begin = 0
    } else {
        begin = a
        end   = b
    }
    const numItems = (end - begin) / stepSize

    return dense(numItems)
        .map((a: any, i: number) => (begin as number) + (i * stepSize))
}


// TODO allow deeper levels to get collapsed in associative, if they all are arrays. if not, then stop at the level, it cannot get further collapsed
// leftover: export function flatten<T>(as: Associative<T>): Array<T>

/**
 * tsfun | flatten
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/flatten.spec.ts
 */
export function flatten<U, T extends Array<U>>(as: Array<T>): T
export function flatten<U, T extends Array<U>>(depth: 1, as: Array<T>): T
export function flatten<U, T extends Array<U>>(as: Array<T>, depth: 1): T
export function flatten<U, T extends Array<U>, K extends Array<T>>(depth: 2, as: Array<K>): T
export function flatten<U, T extends Array<U>, K extends Array<T>>(as: Array<K>, depth: 2): T
export function flatten<U, T extends Array<U>, K extends Array<T>, V extends Array<K>>(depth: 3, as: Array<V>): T
export function flatten<U, T extends Array<U>, K extends Array<T>, V extends Array<K>>(as: Array<V>, depth: 3): T
export function flatten<U, T extends Array<U>>(as: Array<T>, depth: number): T
export function flatten<U, T extends Array<U>>(depth: number, as: Array<T>): T
export function flatten<T>(as: Array<T>, depth: number): Array<unknown>
export function flatten(depth: void): <U, T extends Array<U>>(as: Array<T>) => T
export function flatten(depth: 1): <U, T extends Array<U>>(as: Array<T>) => T
export function flatten(depth: number): <T,R>(as: Array<T>) => Array<R>
export function flatten(p1: any, ...p2: any[]): any {

    if (p2.length > 1) throw 'illegal argument in "tsfun|flatten"'
    if (p2.length === 1) {
        if (!(
            (isNumber(p1) && isArray(p2[0]))
            || (isArray(p1) && isNumber(p2[0]))
        )) throw 'illegal argument in "tsfun|flatten"'
    }

    const _flatten = flatMap(identity as any) as any

    const $ = (num: number) =>
        (as: Associative) => {

            if (num < 1) throw 'illegal argument in "tsfun|flatten"'

            if (p2.length === 0 && (isNumber(p1)||isUndefined(p1)) && !isArray(as)) {
                throw 'illegal argument in "tsfun|flatten"'
            }

            return num === 1 || num === undefined || isObject(as)
                ? _flatten(values(as))
                : flatten(num - 1)(_flatten(as))
        }

    return p2.length === 0
        ? isNumber(p1)
            ? $(p1)
            : p1 === undefined
                ? $(1)
                : $(1)(p1)
        : isNumber(p1)
            ? $(p1)(p2[0])
            : $(p2[0])(p1)
}


/**
 * tsfun | drop
 *
 * Removes elements from the beginning of an Array.
 *
 * Curried version
 *
 * ```
 * >> drop(2)([8, 9, 11])
 * [11]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/drop.spec.ts
 */
export function drop(n: number): <A>(as: Array<A>) => Array<A>
/**
 * tsfun | drop
 *
 * Removes elements from the beginning of an Array.
 *
 * Non-curried version
 *
 * ```
 * >> drop(2, [8, 9, 11])
 * [11]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/drop.spec.ts
 */
export function drop<A>(n: number, as: Array<A>): Array<A>
export function drop(n: number, p2?: any): any {

    if (!isNumber(n)) throwIllegalArgs('drop', 'number', n)

    const $ = <A>(as: any) => {
        if (!isArray(as)) throwIllegalArgs('drop', 'Array', as)

        const as_ = as as Array<A>
        return n < 1 ? as_ :
            as.slice(n)
    }

    return p2 === undefined
        ? $
        : $(p2)
}


/**
 * tsfun | take
 *
 * Takes a number of elements from the beginning of an Array.
 *
 * Curried version
 *
 * ```
 * >> take(5, [1, 2, 7, 7, 8, 9, 11])
 * [1,2,7,7,8]
 * >> take(5)([1, 2, 7, 7, 8, 9, 11]) // curried
 * [1,2,7,7,8]
 * >> take(3, gt(3), [1, 7, 9, 20, 3]) // filter
 * [7,9,20]
 * >> take(3, gt(3))([1, 7, 9, 20, 3]) // filter - curried
 * [7,9,20]
 * >> take(3, _ => _ * 2, gt(6), [1, 7, 9, 20, 3]) // map+filter
 * [14,18,40]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/take.spec.ts
 */
export function take(n: number): <A>(_: Array<A>) => Array<A>
export function take<A>(n: number, as: Array<A>): Array<A>
export function take<A>(n: number, p: Predicate<A>, as: Array<A>): Array<A>
export function take<A, B>(n: number, f: Mapping<A, B>, p: Predicate<A>, as: Array<A>): Array<B>
export function take<A>(n: number, p: Predicate<A>): (_: Array<A>) => Array<A>
export function take<A, B>(n: number, f: Mapping<A, B>, p: Predicate<A>): (_: Array<A>) => Array<B>
export function take<A, B>(f: Mapping<A, B>, p: Predicate<A>): (n: number) => (_: Array<A>) => Array<B>
export function take<A, B>(p: Predicate<A>): (n: number) => (_: Array<A>) => Array<B>
export function take(...args): any {

    if (count(isFunction, args) === args.length) {
        if (args.length === 1) return n => as => take(n, identity, args[0], as)
        if (args.length === 2) return n => as => take(n, args[0], args[1], as)
    }
    const [n, others] = [first(args), rest(args)]

    if (count(isFunction, others) === others.length) {
        if (others.length === 0) return as => take(n, identity, val(true), as)
        if (others.length === 1) return as => take(n, identity, others[0], as)
        if (others.length === 2) return as => take(n, others[0], others[1], as)
    } else {
        if (others.length === 0) return as => take(n, identity, val(true), as)
        if (others.length === 1) return take(n, identity, val(true), others[0])
        if (others.length === 2) return take(n, identity, others[0], others[1])
    }

    const [as, f, p] = [others[2], others[0], others[1]]

    if (!isArray(as)) throwIllegalArgs('take', 'Array', as)

    let items = []
    let i = 0
    while (items.length < n && i < as.length) {

        const result = f(as[i])
        if (p(result)) items.push(result as never)
        i++
    }
    return items
}


/**
 * tsfun | dropRight
 *
 * Drops a number of elements, beginning from the right side of an Array.
 *
 * Non-curried version.
 *
 * ```
 * >> dropRight(2, [8, 9, 11])
 * [8]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/drop_right.spec.ts
 */
export function dropRight<A>(n: number, as: Array<A>): Array<A>
/**
 * tsfun | dropRight
 *
 * Drops a number of elements, beginning from the right side of an Array.
 *
 * Curried version.
 *
 * ```
 * >> dropRight(2)([8, 9, 11])
 * [8]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/drop_right.spec.ts
 */
export function dropRight(n: number): <A>(as: Array<A>) => Array<A>
export function dropRight(n: number, as?: any): any {

    const $ = <A>(as: any): any => {
        if (!isArray(as)) throwIllegalArgs('dropRight', 'Array', as)

        return (as as Array<A>).slice(0, Math.max(0, as.length-n)) as Array<A>
    }

    return as === undefined
        ? $
        : $(as)
}


/**
 * tsfun | dropWhile
 *
 * Non-curried version
 *
 * ```
 * >> dropWhile(lt(20), [7, 9, 10, 13, 21, 20])
 * [21,20]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/drop_while.spec.ts
 */
export function dropWhile<A>(p: Predicate<A>, as: Array<A>): Array<A>
/**
 * tsfun | dropWhile
 *
 * Curried version
 *
 * ```
 * >> dropWhile(lt(20))([7, 9, 10, 13, 21, 20])
 * [21,20]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/drop_while.spec.ts
 */
export function dropWhile<A>(p: Predicate<A>): Mapping<Array<A>>
export function dropWhile<A>(p, as?) {

    if (!isFunction(p)) throwIllegalArgs('dropWhile', 'Function', p)

    const $ = as => {
        if (!isArray(as)) throwIllegalArgs('dropWhile', 'Array', as)

        const as1 = as

        let go = false
        const result = as1.reduce((acc: Array<A>, a: any) =>
            go || !p(a) ? (go = true, acc.concat([a])) : acc, [])

        return result
    }

    return as === undefined
        ? $
        : $(as)
}


/**
 * tsfun | dropRightWhile
 *
 * ```
 * >> dropRightWhile(gt(19), [13, 21, 20]))
 * [13]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/drop_right_while.spec.ts
 */
export function dropRightWhile<A>(p: Predicate<A>): Mapping<Array<A>>
export function dropRightWhile<A>(p: Predicate<A>, as: Array<A>): Array<A>
export function dropRightWhile<A>(p: any, as?: any): any {

    if (!isFunction(p)) throwIllegalArgs('dropRightWhile', 'Predicate', p)

    const $ = (as: any): any => {
        if (!isArray(as)) throwIllegalArgs('dropRightWhile', 'Array', as)

        const as1 = as

        let go = false
        const result = as1.reduceRight((acc: Array<A>, a: any) =>
            go || !p(a) ? (go = true, [a].concat(acc)) : acc, [])

        return result
    }

    return as === undefined
        ? $
        : $(as)
}


/**
 * tsfun | takeRightWhile
 *
 * ```
 * >> takeRightWhile(gt(13))([7, 9, 10, 13, 17, 20])
 * [17,20]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/take_right_while.spec.ts
 */
export function takeRightWhile<A>(predicate: Predicate<A>): Mapping<Array<A>>
export function takeRightWhile<A>(p: Predicate<A>) {

    if (!isFunction(p)) throwIllegalArgs('takeRightWhile', 'Predicate', p)

    return (as: Array<A>) => {
        if (!isArray(as)) throwIllegalArgs('takeRightWhile', 'Array', as)

        const as1 = as

        let go = true
        const result = as1.reduceRight((acc: Array<A>, a: any) =>
            go && p(a) ? [a].concat(acc) : (go = false, acc), [])

        return result
    }
}


/**
 * tsfun | takeRight
 *
 * ```
 * >> takeRight(1)([1, 2])
 * [2]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/take_right.spec.ts
 */
export function takeRight(n: number): <A>(as: Array<A>) => Array<A>
export function takeRight(n: number): <A>(as: Array<A>) => Array<A> {

    function $<A>(as: Array<A>): Array<A>
    function $(as: string): string
    function $<A>(as: Array<A>|string): Array<A>|string {

        if (isArray(as)) {

            return n < 0 ? [] :
                (as as Array<A>).reduceRight((acc: Array<A>, val, i) =>
                        (as.length - i) <= n ? [val].concat(acc) : acc
                    , [])

        } else {

            throwIllegalArgs('takeRight', 'Array', as)
            return [] as never
        }
    }

    return $
}


/**
 * tsfun | takeWhile
 *
 * Takes elements from an array as long as they match a given predicate.
 *
 * ```
 * >> takeWhile(lt(20), [7, 9, 10, 13, 17, 20])
 * [7, 9, 10, 13, 17]
 * >> takeWhile(lt(20))([7, 9, 10, 13, 17, 20]) // curried
 * [7, 9, 10, 13, 17]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/take_while.spec.ts
 */
export function takeWhile<A>(predicate: Predicate<A>): Mapping<Array<A>>
export function takeWhile<A>(predicate: Predicate<A>, as: Array<A>): Array<A>
export function takeWhile<A,B>(f: Mapping<A,B>, predicate: Predicate<B>): Mapping<Array<A>, Array<B>>
export function takeWhile<A,B>(f: Mapping<A,B>, predicate: Predicate<B>, as: Array<A>): Array<B>
export function takeWhile(...args): any {

    if (count(isFunction, args) === args.length) return as => (takeWhile as any)(...append(as)(args))
    if (args.length < 3) return (takeWhile as any)(identity, args[0], args[1])
    const [f, p, as] = [args[0], args[1], args[2]]

    let res
    let acc = []
    for (const a of as) {
        res = f(a)
        if (p(res)) acc = acc.concat([res] as any)
        else break
    }
    return acc
}


/**
 * tsfun | distribute
 *
 * ```
 * >> distribute((_: number) => _.toString())([2, 2, 3]))
 * { '2': [2, 2], '3': [3]}
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/distribute.spec.ts
 */
export function distribute<A>(f: (a: A) => A): (as: Array<string>) => Map<Array<string>>
export function distribute<A>(f: (a: A) => string): (as: Array<A>) => Map<Array<A>>
export function distribute<A>(f: (a: A) => string, as: Array<A>): Map<Array<A>>
export function distribute<A>(as: Array<A>, f: (a: A) => string): Map<Array<A>>
export function distribute(arg, arg2?) {

    const $ = f => as =>
        as.reduce((acc, a) => {

            const r = f(a)
            if (!isString(r)) throwIllegalArgs('distribute', 'function argument returning string', r)

            if (acc[r]) acc[r].push(a)
            else acc[r] = [a]

            return acc

        }, {})

    return arg2 === undefined
        ? $(arg)
        : isFunction(arg)
            ? $(arg)(arg2)
            : $(arg2)(arg)
}


/**
 * tsfun | separate
 *
 * Creates a pair of Arrays,
 * the left hand side of which contains the items
 * filtered, the right hand side the items removed
 * by the given Predicate (see `filter` and `remove`).
 *
 * ```
 * >> separate(lt(3))([2, 3, 1, 3, 4])
 * [[2, 1], [3, 3, 4]]
 * >> separate([2, 3, 1, 3, 4], lt(3))
 * [[2, 1], [3, 3, 4]]
 * >> separate(lt(3), [2, 3, 1, 3, 4]
 * [[2, 1], [3, 3, 4]]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/separate.spec.ts
 */
export function separate<A>(p: (a: A, i?: number) => boolean): (as: Array<A>) => Pair<Array<A>>
export function separate<A>(p: (a: A, i?: number) => boolean, as: Array<A>): Pair<Array<A>>
export function separate<A>(as: Array<A>, p: (a: A, i?: number) => boolean): Pair<Array<A>>
export function separate(...args): any {

    const $ = p => as => isArray(as)
        ? [$filter(p)(as), $remove(p)(as)]
        : throwIllegalArgs('separate', 'Array', as)

    const [p, as] = args.length === 2
        ? isFunction(args[0]) && isArray(args[1])
            ? [args[0], args[1]]
            : isFunction(args[1]) && isArray(args[0])
            ? [args[1], args[0]]
            : throwIllegalArgs('separate', 'Predicate and Array or Array and Predicate /w 2-argument list', args) as never
        : args.length === 1
            ? isFunction(args[0])
                ? [args[0], undefined]
                : throwIllegalArgs('separate', 'function /w 1-argument list)', args[0]) as never
            : throwIllegalArgs('separate', '1 or 2 arguments', args.length) as never

    return as === undefined
        ? $(p)
        : $(p)(as)
}


/**
 * tsfun | append
 *
 * ```
 * >> append(1, 2)([3, 4])
 * [3, 4, 1, 2]
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/append.spec.ts
 */
export function append<A>(...as2: Array<A>): Mapping<Array<A>>
export function append<A>(...as2: Array<A>) {

    return (as: Array<A>) => {

        if (isArray(as) && isArray(as2)) {

            return as.concat(as2 as any) as Array<A>

        } else throwIllegalArgs('append', 'Array', as)
    }
}


/**
 * tsfun | prepend
 *
 * ```
 * >> prepend(1, 2)([3, 4]))
 * [1,2,3,4]
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/prepend.spec.ts
 */
export function prepend<A>(...as2: Array<A>): Mapping<Array<A>>
export function prepend<A>(...as2: Array<A>) {

    return (as: Array<A>) => {

        if (isArray(as) && isArray(as2)) {

            return as2.concat(as as any) as Array<A>

        } else throwIllegalArgs('prepend', 'Array', as)
    }
}


//export function zip<A>(as: Array<A>): <B>(_: Array<B>) => Array<[A,B]>
/**
 * tsfun | zip
 *
 * ```
 * >> zip([1,2,4], [3,4,5])
 * [[1,3],[2,4],[4,5]]
 * ```
 *
 * More examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/zip.spec.ts
 */
export function zip<A>(f: (as: Array<A>) => A): (aas: Array<Array<A>>) => Array<A>
export function zip<A>(): (aas: Array<Array<A>>) => Array<Array<A>>
export function zip<A>(aas: Array<Array<A>>): Array<Array<A>>
export function zip<A>(f: (as: Array<A>) => A, aas: Array<Array<A>>): Array<A>
export function zip<A,B>(as: Array<A>, bs: Array<B>): Array<[A,B]>
export function zip<A,B,C>(f: (a: A, b: B) => C, as: Array<A>, bs: Array<B>): Array<C>
export function zip<A,B,C>(as: Array<A>, bs: Array<B>, cs: Array<C>): Array<[A,B,C]>
export function zip<A,B,C,D>(f: (a: A, b: B, c: C) => D, as: Array<A>, bs: Array<B>, cs: Array<C>): Array<D>
export function zip<A,B,C,D>(as: Array<A>, bs: Array<B>, cs: Array<C>, ds: Array<D>): Array<[A,B,C,D]>
export function zip<A,B,C,D,E>(f: (a: A, b: B, c: C, d: D) => E, as: Array<A>, bs: Array<B>, cs: Array<C>, ds: Array<D>): Array<E>
export function zip<A,B,C,D,E>(as: Array<A>, bs: Array<B>, cs: Array<C>, ds: Array<D>, es: Array<E>): Array<[A,B,C,D,E]>
export function zip<A>(...as: Array<Array<A>>): Array<Array<A>>
export function zip(...args): any {

    function zip2(as: Array<any>, bs: Array<any>): Array<Pair> {

        const minimumLength = Math.min(as.length, bs.length)
        const _as = take(minimumLength)(as as any)
        const _bs = take(minimumLength)(bs as any)

        const zipped: Array<any> = []
        for (let i = 0; i < minimumLength; i++) {
            zipped.push([_as[i] as any, _bs[i] as any])
        }
        return zipped
    }


    function $$(f, aas, spread = true): any {

        return ($reduce0(zip2 as any) as any)(aas)
                .map(flatten(aas.length-1))
                .map(_ => spread ? f.apply(null, _) : f(_))
    }

    const $ = aas => {

        const zipped: any = []
        for (let i = 0; i < Math.min(...aas.map(size)); i++) {
            const took: any = []
            for (let j = 0; j < aas.length; j++) took.push(aas[j][i])
            zipped.push(took)
        }
        return zipped
    }


    return args.length === 0
        ? aas => $(aas)
        : args.length > 1 && isFunction(args[0])
            ? args.length === 2
                ? $$(args[0], drop(1)(args)[0], false)
                : $$(args[0], drop(1)(args))
            : args.length === 1
                ? isFunction(args[0])
                    ? aas => $$(args[0], aas, false)
                    : $(args[0])
                : $(args)
}


/**
 * tsfun | takeUntil
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/take_until.spec.ts
 */
export const takeUntil = <A>(predicate: Predicate<A>) =>
    (as: Array<A>) =>
        (found => found ?
                takeWhile(isNot(predicate))(as).concat([found])
                : as
        )(as.find(predicate))


/**
 * tsfun | reverse
 *
 * ```
 * >> reverse([2, 7, 3])
 * [3,7,2]
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/reverse.spec.ts
 */
export function reverse<A>(as: Array<A>): Array<A> {

    if (isArray(as)) {

        return (as as Array<A>).reduce((acc: Array<A>, a) => [a].concat(acc), [])

    } else {

        throwIllegalArgs('reverse', 'Array', as)
        return []
    }
}


/**
 * tsfun | first
 *
 * ```
 * >> first([4, 5])
 * 4
 * >> first([])
 * undefined
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/first.spec.ts
 */
export function first<T>(as: Array<T>): T|undefined {
    if (!isArray(as)) throwIllegalArgs('first', 'Array', as)
    return as.length === 0 ? undefined : as[0]
}


/**
 * tsfun | rest
 *
 * ```
 * >> rest([4, 5])
 * [5]
 * >> rest([5])
 * []
 * >> rest([])
 * []
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/rest.spec.ts
 */
export function rest<T>(as: Array<T>): Array<T> {
    if (!isArray(as)) throwIllegalArgs('rest', 'Array', as)
    return drop(1, as)
}


/**
 * tsfun | last
 *
 * ```
 * >> last([4, 5])
 * 5
 * >> last([])
 * undefined
 * ```
 *
 * Examples:
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/last.spec.ts
 */
export function last<T>(as: Array<T>): T|undefined {
    if (!isArray(as)) throwIllegalArgs('last', 'Array', as)
    return as.length === 0
        ? undefined
        : as[as.length-1]
}


/**
 * tsfun | takeNth
 *
 * ```
 * >> takeNth(2)([1,2,7,8,9,11])
 * [1,7,9]
 * ```
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/take_nth.spec.ts
 */
export function takeNth(n: number): <A>(as: Array<A>) => Array<A>
export function takeNth(n: number) {

    return as =>
        !isArray(as)
            ? throwIllegalArgs('takeNth', 'Array', as)
            : n < 0
            ? []
            : as.reduce((acc, val, i) =>
                i % n === 0 ? acc.concat([val]) : acc, [])
}


/**
 * tsfun | sort
 *
 * Wrapper around *JavaScripts* Array.prototype.sort()
 * Returns a new Array instead modifying the given one in place.
 *
 * ```
 * >> sort((a, _) => a === 'a' ? -1 : 1)(['b', 'a'])
 * ['a','b]
 *
 * >> sort([2,1])
 * [1,2]
 * ```
 *
 * https://github.com/eighttrigrams/tsfun/blob/master/test/array/sort.spec.ts
 */
export function sort<T>(s: Array<T>): Array<T>
export function sort<A>(f: (a: A, b: A) => number): (as: Array<A>) => Array<A>
export function sort(arg) {

    return isFunction(arg)
        ? as => !isArray(as)
            ? throwIllegalArgs('sort', 'Array', as)
            : copy(as).sort(arg)
        : !isArray(arg)
            ? throwIllegalArgs('sort', 'Array', arg)
            : arg.sort((a, b) =>
                a === b
                    ? 0
                    : a < b
                    ? -1
                    : 1)
}


export function $reduce0<T>(f: (b: T, t: T, i?: number) => T) {

    return (ts: T[]): T => {

        if (isArray(ts) && !isEmpty(ts)) {

            let acc: T = first(ts) as T
            let i = 0
            for (let a of rest(ts)) {
                acc = f(acc, a, i)
                i++
            }
            return acc

        } else throwIllegalArgs('$reduce0', 'Array', ts)
        return ts as never
    }
}
