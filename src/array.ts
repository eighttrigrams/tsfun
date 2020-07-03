import {
    isArray,
    isEmpty, isFunction,
    isNumber,
    isObject, isString,
    isUndefined
} from './predicate'
import {
    first,
    rest,
    take as listTake,
    drop as listDrop,
    dropRight as listDropRight,
    takeRight as listTakeRight,
    dropWhile as listDropWhile,
    takeWhile as listTakeWhile,
    takeRightWhile as listTakeRightWhile,
    dropRightWhile as listDropRightWhile,
    zip as listZip,
} from './list'
import {identity, uncurry2} from './core'
import {Associative, List, Map, Mapping, Pair, Predicate} from './type'
import {values, map as mapAsc, keysAndValues, keys} from './associative'
import {
    filter as filterColl,
    remove as removeColl,
    separate as separateColl, size
} from './collection'
import {pair} from './tuple'
import {to} from './struct';


export const flatMap = <A, B>(f: (_: A) => Array<B>) =>
    (as: Array<A>): Array<B> =>
        (as.length < 1
            ? []
            : as.reduce(intoArrayWith(f as any),[])) as unknown as Array<B>


const intoArrayWith = <A>(f: (_: A) => Array<A>) =>
    (acc: Array<A>, val: A) => acc.concat(f(val))


/**
 * see https://mail.mozilla.org/pipermail/es-discuss/2012-April/022273.html
 */
export function dense(size: number) {

    return Array.apply(null, Array(size))
}


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



export function zipWith<A,B,C> (f: (a: A, b: B) => C, as: Array<A>): (as2: Array<B>) => Array<C>
export function zipWith<A,B,C> (f: (a: A, b: B) => C, as: A[], bs: B[]): Array<C>
export function zipWith<A,B,C,D>(f: (a: A, b: B, c: C) => D, as: A[], bs: B[], cs: C[]): Array<D>
export function zipWith<A>(f: (...a) => A, ...as: any[][]): A[]
export function zipWith<A,B,C> (f, ...aas): any {

    const inner = aas => reduce1(uncurry2(listZip))(aas)
        .map(flatten(aas.length-1))
        .map(_ => f.apply(null, _))

    return aas.length === 1
        ? bs => inner(pair(aas[0],bs))
        : inner(aas)
}


export function reduce1<T>(f: (b: T, t: T, i?: number) => T) {

    return (ts: T[]): T => {

        if (isArray(ts) && !isEmpty(ts)) {

            let acc: T = first(ts) as T
            let i = 0
            for (let a of rest(ts)) {
                acc = f(acc, a, i)
                i++
            }
            return acc

        } else {

            throw "illegal argument - must be array or object"
        }
    }
}


export function map<A = any, B = A>(f: (_: A, i: number) => B): (as: Array<A>) => Array<B>
export function map<A = any, B = A >(f: (_: A) => B): (as: Array<A>) => Array<B>
export function map<A, B>(...args: any[]): any {

    if (args.length > 1) throw 'illegal argument - in \'tsfun|map\''
    return mapAsc(args[0])
}


// TODO allow deeper levels to get collapsed in associative, if they all are arrays. if not, then stop at the level, it cannot get further collapsed
// leftover: export function flatten<T>(as: Associative<T>): Array<T>

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

    if (p2.length > 1) throw 'illegal arguments - in \'flatten\''
    if (p2.length === 1) {
        if (!(
            (isNumber(p1) && isArray(p2[0]))
            || (isArray(p1) && isNumber(p2[0]))
        )) throw 'illegal arguments - in \'flatten\''
    }

    const _flatten = flatMap(identity as any) as any

    const inner = (num: number) =>
        (as: Associative) => {

            if (num < 1) throw 'illegal arguments - in \'flatten\''

            if (p2.length === 0 && (isNumber(p1)||isUndefined(p1)) && !isArray(as)) {
                throw 'illegal arguments - in \'flatten\''
            }

            return num === 1 || num === undefined || isObject(as)
                ? _flatten(values(as))
                : flatten(num - 1)(_flatten(as))
        }

    return p2.length === 0
        ? isNumber(p1)
            ? inner(p1)
            : p1 === undefined
                ? inner(1)
                : inner(1)(p1)
        : isNumber(p1)
            ? inner(p1)(p2[0])
            : inner(p2[0])(p1)
}


export function filter<A>(p: (a: A, i: number) => boolean): (_: Array<A>) => Array<A>
export function filter<A>(p: (a: A) => boolean): (_: Array<A>) => Array<A>
export function filter<A>(...args: any[]): any {

    if (args.length > 1) throw 'illegal argument - in \'tsfun|filter\''
    return filterColl(args[0])
}


export function drop(n: number): <A>(as: Array<A>) => Array<A>
export function drop<A>(n: number, as: Array<A>): Array<A>
export function drop(p1: number, p2?: any): any {

    return listDrop(p1, p2)
}


export function take(n: number): <A>(_: Array<A>) => Array<A>
export function take<A>(n: number, as: Array<A>): Array<A>
export function take<A>(p1: number, p2?: any): any {

    return listTake(p1, p2)
}


export function dropRight(n: number): <A>(as: Array<A>) => Array<A>
export function dropRight<A>(n: number, as: Array<A>): Array<A>
export function dropRight(p1: number, p2?: any): any {

    return listDropRight(p1, p2)
}


export function dropWhile<A>(predicate: Predicate<A>): Mapping<Array<A>>
export function dropWhile<A>(predicate: Predicate<A>, as: Array<A>): Array<A>
export function dropWhile<A>(p1: any, p2?: any): any {

    return listDropWhile(p1, p2)
}


export function dropRightWhile<A>(predicate: Predicate<A>): Mapping<Array<A>>
export function dropRightWhile<A>(predicate: Predicate<A>, as: Array<A>): Array<A>
export function dropRightWhile<A>(p1: any, p2?: any): any {

    return listDropRightWhile(p1, p2)
}


export function takeRightWhile<A>(predicate: Predicate<A>): Mapping<Array<A>>
export function takeRightWhile<A>(predicate: Predicate<A>) {

    return listTakeRightWhile(predicate)
}

export function takeRight(n: number): <A>(as: Array<A>) => Array<A>
export function takeRight(n: number): <A>(as: Array<A>) => Array<A> {

    return listTakeRight(n)
}


export function takeWhile<A>(predicate: Predicate<A>): Mapping<Array<A>>
export function takeWhile<A>(predicate: Predicate<A>, list: Array<A>): Array<A>
export function takeWhile<A>(p1, p2?): any {

    return listTakeWhile(p1, p2)
}


export function separate<A>(p: (a: A, i: number) => boolean): (as: Array<A>) => Pair<Array<A>>
export function separate<A>(p: (a: A) => boolean): (as: Array<A>) => Pair<Array<A>>
export function separate<A>(p: (a: A, i: number) => boolean, as: Array<A>): Pair<Array<A>>
export function separate<A>(p: (a: A) => boolean, as: Array<A>): Pair<Array<A>>
export function separate<A>(as: Array<A>, p: (a: A, i: number) => boolean): Pair<Array<A>>
export function separate<A>(as: Array<A>, p: (a: A) => boolean): Pair<Array<A>>
export function separate<A>(...args): any {

    return args.length === 1
        ? separateColl(args[0])
        : isFunction(args[0])
            ? separateColl(args[0], args[1])
            : separateColl(args[1], args[0])
}


export function remove<A>(p: (a: A, i: number) => boolean): (as: Array<A>) => Array<A>
export function remove<A>(p: (a: A) => boolean): (as: Array<A>) => Array<A>
export function remove<A>(p: (a: A, i: number) => boolean, as: Array<A>): Array<A>
export function remove<A>(p: (a: A) => boolean, as: Array<A>): Array<A>
export function remove<A>(as: Array<A>, p: (a: A, i: number) => boolean): Array<A>
export function remove<A>(as: Array<A>, p: (a: A) => boolean): Array<A>
export function remove(...args): any {
    
    return args.length === 1
        ? removeColl(args[0])
        : isFunction(args[0])
            ? removeColl(args[0], args[1])
            : removeColl(args[1], args[0])
}


export function append<A>(...as2: Array<A>): Mapping<Array<A>>
export function append<A>(...as2: Array<A>) {

    return (as: Array<A>) => {

        if (isArray(as) && isArray(as2)) {

            return as.concat(as2 as any) as Array<A>

        } else throw 'illegal argument - in \'append\''
    }
}



export function prepend<A>(...as2: Array<A>): Mapping<Array<A>>
export function prepend<A>(...as2: Array<A>) {

    return (as: Array<A>) => {

        if (isArray(as) && isArray(as2)) {

            return as2.concat(as as any) as Array<A>

        } else throw 'illegal argument - in \'prepend\''
    }
}


export function forEach<A>(f: (_: A, i: number) => void): (as: Array<A>) => Array<A>
export function forEach<A>(f: (_: A) => void): (as: Array<A>) => Array<A>
export function forEach<A>(f) {

    return (as: any) => {

        if (isArray(as)) {

            let i = 0;
            for (let item of as) {
                (f as any)(item, i)
                i++
            }
            return as as Array<A>

        } else {

            throw 'illegal argument - in \'forEach\', must be array'
        }
    }
}



export function reduce<A, B>(f: (b: B, a: A, i: number) => B, init: B): (as: Array<A>) => B
export function reduce<A, B>(f: (b: B, a: A) => B, init: B): (as: Array<A>) => B
export function reduce<T, B>(f, init) {

    return (ts: any): B => {

        if (isArray(ts)) {

            let acc = init;
            let i = 0;
            for (let a of ts) {
                acc = f(acc, a, i)
                i++
            }
            return acc

        } else {

            throw 'illegal argument - in \'reduce\', must be array'
        }
    }
}


/**
 * tsfun | zip
 */
export function zip<A>(as: Array<A>): <B>(_: Array<B>) => Array<[A,B]>;
export function zip<A,B>(as: Array<A>, bs: Array<B>): Array<[A,B]>;
export function zip<A,B,C>(as: Array<A>, bs: Array<B>, cs: Array<C>): Array<[A,B,C]>;
export function zip<A,B,C,D>(as: Array<A>, bs: Array<B>, cs: Array<C>, ds: Array<D>): Array<[A,B,C,D]>;
export function zip<A,B,C,D,E>(as: Array<A>, bs: Array<B>, cs: Array<C>, ds: Array<D>, es: Array<E>): Array<[A,B,C,D,E]>;
export function zip(...fs: Array<Array<any>>): Array<Array<any>>;
export function zip<A>(...args): any {

    const $ = ls => {

        const zipped: any = [];
        for (let i = 0; i < Math.min(...ls.map(size)); i++) {
            const took: any = [];
            for (let j = 0; j < ls.length; j++) took.push(ls[j][i]);
            zipped.push(took)
        }
        return zipped;
    }

    return (args.length === 1)
        ? (other: any) => $([args[0],other])
        : $(args);
}