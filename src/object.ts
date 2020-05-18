import {copy} from './collection'
import {Mapping} from './type'


export function assoc<T, K extends keyof T>(key: keyof T, val: T[K]): <T>(o: T) => T
export function assoc<T, K extends keyof T>(key: keyof T, val: T[K], o: T): T
export function assoc(key, val, o?) {

    const $ = o => {

        const c: any = copy(o as any)
        c[key] = val
        return c
    }

    return o === undefined
        ? $
        : $(o)
}


export function update<T, K extends keyof T>(key: keyof T, f: Mapping<T[K]>): <T>(o: T) => T
export function update<T, K extends keyof T>(key: keyof T, f: Mapping<T[K]>, o: T): T
export function update(key, f: any, o?) {

    const $ = o => {

        const c: any = copy(o as any)
        c[key] = f(c[key])
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
