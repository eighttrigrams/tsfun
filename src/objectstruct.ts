import {isArray, isEmpty, isObject} from './predicate';
import {reverseUncurry2} from './core';
import {ArrayList, ObjectStruct, Predicate} from './type';
import {on} from './comparator';


// ------------ @author Daniel de Oliveira -----------------

export const jsonClone = <T>(object: T) => JSON.parse(JSON.stringify(object)) as T;


export function clone<T>(struct: string, f?: Function): string;
export function clone<T>(struct: number, f?: Function): number;
export function clone<T>(struct: undefined, f?: Function): undefined;
export function clone<T>(struct: T, f?: Function): T;
export function clone<T>(struct: T|undefined|number|string, f?: Function): T|undefined|number|string {

    if (struct === undefined) return undefined;
    if (typeof struct === 'string') return struct as string; // TODO make predicates isString, isNumber for internal use
    if (typeof struct === 'number') return struct as number;

    if (isArray(struct)) {

        return (struct as unknown as Array<any>).reduce((klone: Array<any>, val: any) => {
            klone.push(clone(val, f));
            return klone;
        }, []) as T

    } else if (isObject(struct)) {

        return (Object.keys(struct as any)).reduce((klone, k: any) =>{
            (klone as any)[k] = clone((struct as any)[k], f);
            return klone;
        }, {} as ObjectStruct) as T;

    } else {

        return (f ? f(struct) : jsonClone(struct)) as T;
    }
}


export const getOnOr = <T>(ds: ObjectStruct, alternative: any) => (path: string) => {

    const result = getElForPathIn(ds as Object, path);
    return result !== undefined
        ? result
        : alternative;
};


export const getOn = <T>(ds: ObjectStruct) => (path: string) => {

    const result = getOnOr(ds, undefined)(path);
    if (result === undefined) throw Error('getOn, got nothing');
    return result;
};


// library internal
export function getElForPathIn(object: ObjectStruct, path: string) {

    let result = object as any;
    for (let segment of path.split('.')) {
        if (result[segment]
            || result[segment] === ''
            || result[segment] === 0
            || result[segment] === false) result = result[segment];
        else return result = undefined;
    }
    return result;
}


export function takeOrMake(object: ObjectStruct, path: string, val: any) {

    if (getElForPathIn(object, path)) return getElForPathIn(object, path);
    let result: any = object;
    let last;
    let lastSegment: any;
    for (let segment of path.split('.')) {
        if (!result[segment]) result[segment] = { };
        last = result;
        lastSegment = segment;
        result = result[segment];
    }
    return last[lastSegment] = val;
}


export const to = reverseUncurry2(getElForPathIn);


/* experimental */ export const sameOn = <T>(path: string, l: T, r: T) =>
    on(path)(l)(r);


/* experimental */ export const option = <A>(f: Predicate<A>) =>
    (a: A) => f(a) ? a : {};


/* experimental */ export const mapOption = <A>(f: (a: A) => A) =>
    (a: A) => isEmpty(a) ? {} : f(a);