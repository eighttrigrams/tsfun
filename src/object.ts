import {copy} from './collection'
import {Mapping} from './type'
import {isFunction} from './predicate';


export function update<T, K extends keyof T>(key: keyof T, f: Mapping<T[K]>|T[K]): <T>(o: T) => T
export function update<T, K extends keyof T>(key: keyof T, f: Mapping<T[K]>|T[K], o: T): T
export function update(key, f: any, o?) {

    const $ = o => {

        const c: any = copy(o as any)
        c[key] = isFunction(f) ? f(c[key]) : f;
        return c
    }

    return o === undefined
        ? $
        : $(o)
}



export function dissoc<T, K extends keyof T>(key: keyof T): <T>(o: T) => T
export function dissoc<T, K extends keyof T>(key: keyof T, o: T): T
export function dissoc(key, o?) {

    const $ = o => {

        const c: any = copy(o as any)
        delete c[key]
        return c
    }

    return o === undefined
        ? $
        : $(o)
}
