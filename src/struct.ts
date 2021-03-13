import {Array2, Mapping, SPath} from './type'
import {isArray, isArray2, isFunction, isNumber, isObject, isString} from './predicate'
import {reverseUncurry2} from './core'
import {copy} from './collection'
import {rest} from './list'


// ------------ @author Daniel de Oliveira -----------------

export const jsonClone = <T>(object: T) => JSON.parse(JSON.stringify(object)) as T


export function clone<T>(struct: boolean, f?: Function): boolean
export function clone<T>(struct: string, f?: Function): string
export function clone<T>(struct: number, f?: Function): number
export function clone<T>(struct: undefined, f?: Function): undefined
export function clone<T>(struct: T, f?: Function): T
export function clone<T>(struct: T|undefined|number|string|boolean, f?: Function): T|undefined|number|string|boolean {

    if (struct === undefined) return undefined
    if (typeof struct === 'boolean') return struct as boolean
    if (typeof struct === 'string') return struct as string
    if (typeof struct === 'number') return struct as number

    if (isArray(struct)) {

        return (struct as unknown as Array<any>).reduce((klone: Array<any>, val: any) => {
            klone.push(clone(val, f))
            return klone
        }, []) as T

    } else if (isObject(struct)) {

        return (Object.keys(struct as any)).reduce((klone, k: any) =>{
            (klone as any)[k] = clone((struct as any)[k], f)
            return klone
        }, {} as Object) as T

    } else {

        return (f ? f(struct) : jsonClone(struct)) as T
    }
}


export function get<V>(path: Array2<string|number>, alternative?: V): <T>(o: T) => V
export function get<V>(path: string, alternative?: V): <T>(o: T) => V
export function get(path: number, alternative?: any): <T>(as: Array<T>) => Array<T>
export function get(path_, alternative?: any) {

    if (isArray(path_)) { if (path_.length < 2) throw 'illegal argument - array path must be at least of length 2' }
    else if (!isString(path_)&&!isNumber(path_)) throw 'illegal argument - path must be string, number, or array of at least 2'

    return ds => {
        const result = (isString(path_) || isNumber(path_)) 
            ? ds[path_]
            : $getElForPathIn(ds as Object, path_ as any)
        return result !== undefined ? result : alternative
    }
}


export function lookup<T, V>(ds: T, alternative?: V): (path: SPath) => V
export function lookup<T>(ds: Array<T>, alternative?: T): (path: number) => T
export function lookup<T, V>(ds: T, alternative?: V): (path: string) => V
export function lookup(ds, alternative?) {

    return path => get(path, alternative)(ds)
}


export function update<T>(k: Array2<string|number>, update_fun: ((val: T) => T)|T, as: Array<T>): Array<T>
export function update<U, T>(k: Array2<string|number>, update_fun: ((val: U) => U)|U, o: T): T
export function update<U>(k: number, update_fun: ((val: U) => U)|U, s: Array<U>): Array<U>
export function update<T, K extends keyof T>(key: keyof T, f: Mapping<T[K]>|T[K], o: T): T

export function update<U>(k: number, update_fun: ((val: U) => U)|U): <T extends U>(s: Array<T>) => Array<T>
export function update<T, K extends keyof T>(key: keyof T, f: Mapping<T[K]>|T[K]): <T1>(o: T1) => T1
export function update<U>(k: string, update_fun: ((val: U) => U)|U): <T,V extends T>(s: T) => V
export function update<U>(k: Array2<string|number>, update_fun: ((val: U) => U)|U): <T,V extends T>(s: T) => V

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


export function dissoc<T, K extends keyof T>(key: keyof T): <T>(o: T) => T
export function dissoc(path: string|Array<string|number>): <T>(o: T) => T
export function dissoc<T, K extends keyof T>(key: keyof T, o: T): T
export function dissoc(path, o?) {

    const $ = struct => {

        if (isString(path)||isNumber(path)) {
            
            const c = copy(struct)
            delete c[path]
            return c

        } else if (isArray(path)) {

            if (path.length < 2) throw 'illegal argument - array path should have min length 2'
            return $update1(clone(path), struct, undefined, false)

        } else {

            throw 'illegal argument - path expected to be one of array, number, string'
        }
        
    }

    return o === undefined
        ? $
        : $(o)
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

    const pathSegments = (isString(path_) ? path(path_ as any) : path_) as Array<string|number>

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


export function to<T = any>(path: SPath) {

    if (isString(path)||isNumber(path)) return _ => _[path as any]
    if (!isArray(path)) throw 'illegal argument - if not string or number, then array expected'
    if ((path as any).length < 2) throw 'illegal argument - array path must be at least of length 2'

    return s => (reverseUncurry2($getElForPathIn))(path)(s) as T
}


const isObject_ = (o: any) => o instanceof Object


// library internal
export function $getElForPathIn(object: any, path: Array2<string|number>): any {

    if (!path) throw 'illegal argument - path not set'
    if (isString(path)||isNumber(path)) throw 'illegal argument - getElForPathIn expects array'
    if (path.length < 2) throw 'illegal argument in getElForPathIn - expected min length 2'

    return (function $(object, path) {
    
        const key = path[0]
    
        return path.length === 1
            ? isString(key)
                ? isObject_(object)
                    ? makeValueForCurrentKey(object[key])
                    : undefined
                : isArray(object)
                    ? makeValueForCurrentKey(object[key])
                    : undefined
            : object[key]
                ? $(object[key], rest(path) as any)
                : undefined

    })(object, path)
}


export function path(path: string): Array2<string|number> {

    if (isString(path)) {

        const segments = []
        let current = ''
        for (let i = 0; i < path.length; i++) {
            if (path[i] !== '[' && path[i] !== '.' && path[i] !== ']') {
                current += path[i]
            } else {
                if (path[i] === ']') {
                    segments.push(parseInt(current) as never)
                } else {
                    if (current) segments.push(current as never)
                }
                current = ''
            }
        }
        if (current) segments.push(current as never)

        if (!isArray2(segments)) throw 'illegal argument - path expected to yield 2 segments'
        return segments
    } 
    throw 'illegal arguments - must be string'
}


function makeValueForCurrentKey(resultSegment: any) {
    return (resultSegment
        || resultSegment === ''
        || resultSegment === 0
        || resultSegment === false)
        ? resultSegment
        : undefined
}


function _back(path: Array<number|string>): string {

    if (isArray(path)) {

        let joined = (path as Array<number|string>).map((segment: any) => {

            return isString(segment)
                ? '.' + segment + '.'
                : '[' + segment.toString() + ']'

        }).join('').replace('..', '.').replace('.[', '[')

        if (joined.startsWith('.')) joined = joined.slice(1)
        if (joined.endsWith('.')) joined = joined.slice(0, joined.length-1)
        return joined
    }
    throw 'illegal arguments - must be Array<number|string>'
}
