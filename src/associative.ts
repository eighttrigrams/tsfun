import {ObjectCollection, ObjectMap, UntypedObjectCollection} from './type';
import {range, zip} from "./arraylist";
import {isArray} from 'tsfun-core/src/predicate';


export function dissocValue<T>(key: string): (struct: ObjectMap<T>) => ObjectMap<T>;
export function dissocValue<A>(key: number): (struct: Array<A>) => Array<A>;
export function dissocValue<T>(key: string|number) {

    return (struct: ObjectMap<T>|Array<T>) => {

        const newStruct = isArray(struct) ? [] : {};
        keysAndValues(struct as any).forEach(([k, v]) => {
            (newStruct as any)[k] = v;
        });
        if (isArray(struct)) (newStruct as any).splice(key, 1);
        else delete (newStruct as any)[key];
        return newStruct;
    }
}


export function updateValue<T>(key: string, f: (_: T) => T): (struct: ObjectMap<T>) => ObjectMap<T>;
export function updateValue<A>(key: number, f: (_: A) => A): (struct: Array<A>) => Array<A>;
export function updateValue<T>(key: string|number, f: (_: T) => T) {

    return (struct: ObjectMap<T>|Array<T>) => {

        const newStruct = isArray(struct) ? [] : {};
        keysAndValues(struct as any).forEach(([k, v]) => {
            (newStruct as any)[k] = v;
        });
        (newStruct as any)[key] = f((newStruct as any)[key]);
        return newStruct;
    }
}


export function assocValue<T>(key: string, value: T): (struct: ObjectMap<T>) => ObjectMap<T>;
export function assocValue<A>(key: number, value: A): (struct: Array<A>) => Array<A>;
export function assocValue<T>(key: string|number, value: T) {

    return (struct: ObjectMap<T>|Array<T>) => {

        const newStruct = isArray(struct) ? [] : {};
        keysAndValues(struct as any).forEach(([k, v]) => {
            (newStruct as any)[k] = v;
        });
        (newStruct as any)[key] = value;
        return newStruct;
    }
}


export function lookup<T>(struct: ObjectMap<T>): (targetId: string) => T|undefined;
export function lookup<A>(struct: Array<A>): (targetId: number) => A|undefined;
export function lookup<A>(struct: ObjectCollection<A>|Array<A>) {

    return (targetId: string|number): A|undefined => (struct as any)[targetId];
}


export function keysAndValues<A>(as: Array<A>): Array<[number, A]>;
export function keysAndValues<T>(o: ObjectCollection<T>): Array<[string, T]>;
export function keysAndValues<T>(o: ObjectCollection<T>|Array<T>): Array<[string|number, T]> {

    return zip(keys(o))(Object.values(o)) as Array<[string, T]>;
}


export function keys<T>(as: Array<T>): number[];
export function keys(o: UntypedObjectCollection): string[];
export function keys<T>(t: Array<T>|UntypedObjectCollection): number[]|string[] {

    return isArray(t)
        ? range(t.length)
        : Object.keys(t);
}


export function values<A>(as: Array<A>): Array<A>;
export function values<T>(o: ObjectCollection<T>): Array<T>;
export function values<T>(t: ObjectCollection<T>|Array<T>): Array<T> {

    return isArray(t)
        ? t as Array<T>
        : Object.values(t);
}
