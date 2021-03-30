import {Array2, Mapping, Path, Map, Key, Associative} from './type'
import {isArray, isArray2, isAssociative, isFunction, isKey, isNumber, isPrimitive, isString} from './predicate'
import {throwIllegalArgs} from './core'
import {copy, map} from './associative'
import {rest} from './array'


// ------------ @author Daniel de Oliveira -----------------

/**
 * tsfun | clone
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/struct/clone.spec.ts
 */
export function clone(struct: boolean): boolean
export function clone(struct: string): string
export function clone(struct: number): number
export function clone(struct: undefined): undefined
export function clone(struct: null): null
export function clone<T>(struct: Array<T>): Array<T>
export function clone<T>(struct: Map<T>): Map<T>
export function clone(struct) {

    return isPrimitive(struct)
        ? struct
        : isAssociative(struct)
        ? map(struct, clone)
        : throwIllegalArgs('clone', 'Primitive or Associative', struct)
}


/**
 * tsfun | to
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/struct/to.spec.ts
 */
export function to<T = any>(path: Array2<Key>|Key, alternative?: any): {
    (t: Array<any>): T
    (t: Map<any>): T
}
export function to(path: Path, alternative?) {

    return !isKey(path)
        ? throwIllegalArgs('to', 'Array of at least 2 or string or number', path)
        : ds => {
            const result = (isString(path) || isNumber(path))
                ? ds[path]
                : $getElForPathIn(ds as Object, path as any)

            return result !== undefined ? result : alternative
        }
}


/**
 * tsfun | update
 *
 * ```
 * >> update('a', _ => _ * 2, {a: 1, b: 'b'})
 * {a: 2, b: 'b'}
 * >> update('a', 2, {a: 1, b: 'b'})
 * {a: 2, b: 'b'}
 * >> update(0, _ => _ * 2, [1, 'b'])
 * [2, 'b']
 * >> update([0, 'a'], 4, [{a: 2}])
 * [{a: 4}]
 * ```
 *
 * More examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/struct/update.spec.ts
 */
export function update<T, K extends keyof T>(k: K, f: (val: T[K]) => T[K], s: T): T
export function update<T, K extends keyof T>(k: K, f: T[K], s: T): T
export function update<T, K extends keyof T>(k: K, f: any, s: T): unknown
export function update<T>(path: Array2<Key>, f_or_v: any, s: T): T
/**
 * tsfun | update
 *
 * ```
 * >> update('a', _ => _ * 2)({a: 1, b: 'b'})
 * {a: 2, b: 'b'}
 * >> update('a', 2)({a: 1, b: 'b'})
 * {a: 2, b: 'b'}
 * >> update(0, _ => _ * 2)([1, 'b'])
 * [2, 'b']
 * >> update([0, 'a'], 4)([{a: 2}])
 * [{a: 4}]
 * ```
 *
 * More examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/struct/update.spec.ts
 */
export function update<V>(path: Path, v: any): <T extends Array<any>|Map<any>>(o: T) => T
export function update(path, update_fun, o?) {

    const $ = struct => {

        if (isString(path) || isNumber(path)) {

            return $update0(path, update_fun, struct)

        } else if (isArray(path)) {

            if (path.length < 2) throw 'illegal argument - path must be at least be of length 2'
            return $update1(clone(path), struct, update_fun, true)

        } else {

            throw 'illegal argument - must be one of Array<string|number>, string, number'
        }
    }

    return o !== undefined
        ? $(o)
        : $
}


export function $detach<T>(key: any, as?: any): any {

    const $ = struct => {

        const newStruct = copy(struct as any)
        if (isArray(struct)) (newStruct as any).splice(key, 1)
        else delete (newStruct as any)[key]
        return newStruct
    }

    return as === undefined
        ? $
        : $(as)
}


/**
 * tsfun | detach
 *
 *  * ```
 * >> detach('a')({ a: 4 } as Map<number>)
 * {}                         // type: Map<number>
 * >> detach('a')({ a: 4 })
 * {}                         // type: {a: number}
 * >> detach(0)([1, 2])
 * []
 * >> detach(['a', 'b'])({ a: { b: {} } })
 * {a: {}}                    // type: {a: b: {}}, you may want to adjust that
 * ```
 *
 * More examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/struct/detach.spec.ts
 */
export function detach(k: string): <T extends Map<any>>(m: T) => T
export function detach(i: number): <T  extends Array<any>>(as: T) => T
export function detach(k: Path): <T extends Array<any>|Map<any>>(s: T) => T
/**
 * tsfun | detach
 *
 * ```
 * >> detach('a', { a: 4 } as Map<number>)
 * {}                         // type: Map<number>
 * >> detach('a', { a: 4 })
 * {}                         // type: {a: number}
 * >> detach(0, [1, 2])
 * []
 * >> detach(['a', 'b'], { a: { b: {} } })
 * {a: {}}                    // type: {a: b: {}}, you may want to adjust that
 * ```
 *
 * More examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/struct/detach.spec.ts
 */
export function detach<T extends Map<any>>(k: string, m: T): T
export function detach<T extends Array<any>>(i: number, as: T): T
export function detach<T extends Map<any>|Array<any>>(k: Path, s: T): T
export function detach(path, s?) {

    const $ = s => {
        if (!isAssociative(s)) throwIllegalArgs('detach', 'Associative', s)

        if (isString(path)||isNumber(path)) {

            if (isArray(s)) return $detach(path, s)

            const c = copy(s)
            delete c[path]
            return c

        } else return $update1(clone(path), s, undefined, false)
    }

    return !isNumber(path)&&!isString(path)&&!isArray2(path)
        ? throwIllegalArgs('detach', 'string or number or array of min length 2', path)
        : s === undefined
            ? $
            : !isAssociative(s)
                ? throwIllegalArgs('detach', 'Associative', s)
                : $(s)
}


function $update0(key, f: any, o?) {

    const $ = o => {

        const c: any = copy(o as any)
        c[key] = isFunction(f) ? f(c[key]) : f
        return c
    }

    return o === undefined
        ? $
        : $(o)
}


function $update1(path_ /*mut inplace*/, struct, update_fun, update = true) {

    const pathSegments = path_ as Array<string|number>

    const pathSegment = pathSegments[0]
    const copied = copy(struct)

    if (pathSegments.length === 1) {
        if (update) {
            const updateFunResult =  isFunction(update_fun) ? update_fun(copied[pathSegment]) : update_fun
            copied[pathSegment] = isFunction(updateFunResult) ? updateFunResult() : updateFunResult
        }
        else delete copied[pathSegment]
    } else {
        pathSegments.shift()
        if (update || copied[pathSegment] !== undefined) {
            copied[pathSegment] = $update1(pathSegments, copied[pathSegment], update_fun, update)
        }
    }
    return copied
}


// library internal
export function $getElForPathIn(object: any, path: Array2<string|number>): any {

    if (!isArray2(path)) throw 'illegal argument in getElForPathIn - expected path as array with min length 2'

    return (function $(object, path) {

        const next = object[path[0]]

        return path.length === 1
            ? next
            : isAssociative(next)
                ? $(next, rest(path) as any)
                : undefined

    })(object, path)
}
