import {copy} from "./collection";


export function assoc<T, K extends keyof T>(key: keyof T, val: T[K], o: T): T {

        const c: any = copy(o as any);
        c[key] = val;
        return c as T;
    }
