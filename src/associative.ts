import {ObjectCollection, ObjectMap, UntypedObjectCollection} from './type';
import {range, zip} from "./arraylist";
import {isArray} from 'tsfun-core/src/predicate';
import {ArrayList} from 'tsfun-core';


// Written with Thomas Kleinke
export function get<A>(i: number, defaultValue?: A|undefined): (as: ArrayList<A>) => A|undefined;
export function get<T>(i: string, defaultValue?: T|undefined): (as: ObjectMap<T>) => T|undefined;
export function get<T>(i: number|string, alternative?: T|undefined) {

    return (as: ArrayList<T>|ObjectMap<T>): T|undefined => {

        const result = (as as any)[i];
        return result !== undefined ? result : alternative;
    };
}


export function copy<T>(struct: Array<T>): Array<T>;
export function copy<T>(struct: ObjectMap<T>): ObjectMap<T>;
export function copy<T>(struct: Array<T>|ObjectMap<T>) {

    return isArray(struct) ? [...struct] : {...struct};
}


export function dissoc<T>(key: string): (struct: ObjectMap<T>) => ObjectMap<T>;
export function dissoc<A>(key: number): (struct: Array<A>) => Array<A>;
export function dissoc<T>(key: string|number) {

    return (struct: ObjectMap<T>|Array<T>) => {

        const newStruct = copy(struct as any);
        if (isArray(struct)) (newStruct as any).splice(key, 1);
        else delete (newStruct as any)[key];
        return newStruct;
    }
}


export function update<T>(key: string, f: (_: T) => T): (struct: ObjectMap<T>) => ObjectMap<T>;
export function update<A>(key: number, f: (_: A) => A): (struct: Array<A>) => Array<A>;
export function update<T>(key: string|number, f: (_: T) => T) {

    return (struct: ObjectMap<T>|Array<T>) => {

        const newStruct = copy(struct as any);
        (newStruct as any)[key] = f((newStruct as any)[key]);
        return newStruct;
    }
}


export function assoc<T>(key: string, value: T): (struct: ObjectMap<T>) => ObjectMap<T>;
export function assoc<A>(key: number, value: A): (struct: Array<A>) => Array<A>;
export function assoc<T>(key: string|number, value: T) {

    return (struct: ObjectMap<T>|Array<T>) => {

        const newStruct = copy(struct as any);
        (newStruct as any)[key] = value;
        return newStruct;
    }
}


export function lookup<T>(struct: ObjectMap<T>, alternative?: T): (targetId: string) => T|undefined;
export function lookup<A>(struct: Array<A>, alternative?: A): (targetId: number) => A|undefined;
export function lookup<A>(struct: ObjectCollection<A>|Array<A>, alternative?: any) {

    return (targetId: string|number): A|undefined => {

        const result = (struct as any)[targetId];
        return result !== undefined ? result : alternative;
    }
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
