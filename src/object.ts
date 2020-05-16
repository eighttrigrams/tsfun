import {copy} from './collection'
import {Mapping} from './type'


export function assoc<T, K extends keyof T>(key: keyof T, val: T[K]): <T>(o: T) => T
export function assoc<T, K extends keyof T>(key: keyof T, val: T[K], o: T): T
export function assoc<T, K extends keyof T>(key: keyof T, val: T[K], o?: T): T {

    const inner = <T>(o: T) => {

        const c: any = copy(o as any)
        c[key] = val
        return c as T
    }

    return (o === undefined
        ? inner
        : inner(o)) as T
}


export function update<T, K extends keyof T>(key: keyof T, f: Mapping<T[K]>): <T>(o: T) => T
export function update<T, K extends keyof T>(key: keyof T, f: Mapping<T[K]>, o: T): T
export function update<T, K extends keyof T>(key: keyof T, f: any, o?: T): T {

    const inner = <T>(o: T) => {

        const c: any = copy(o as any)
        c[key] = f(c[key])
        return c as T
    }

    return (o === undefined
        ? inner
        : inner(o)) as T
}



export function dissoc<T, K extends keyof T>(key: keyof T): <T>(o: T) => T
export function dissoc<T, K extends keyof T>(key: keyof T, o: T): T
export function dissoc<T, K extends keyof T>(key: keyof T, o?: T): T {

    const inner = <T>(o: T) => {

        const c: any = copy(o as any)
        delete c[key]
        return c as T
    }

    return (o === undefined
        ? inner
        : inner(o)) as T
}
