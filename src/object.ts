import {copy} from "./collection";


export function assoc<T, K extends keyof T>(key: keyof T, val: T[K]): <T>(o: T) => T;
export function assoc<T, K extends keyof T>(key: keyof T, val: T[K], o: T): T;
export function assoc<T, K extends keyof T>(key: keyof T, val: T[K], o?: T): T {

    const inner = <T>(o: T) => {

        const c: any = copy(o as any)
        c[key] = val
        return c as T
    }

    return (o === undefined
        ? inner
        : inner(o)) as T;
}
