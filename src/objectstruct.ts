import {isArray, isEmpty, isObject} from './predicate';
import {reverseUncurry2} from './core';
import {ArrayList, ObjectStruct, Predicate} from './type';
import {on} from './comparator';


// ------------ @author Daniel de Oliveira -----------------

export const jsonClone = <T>(object: T) => JSON.parse(JSON.stringify(object)) as T;


export const clone = <T>(struct: T, f?: Function): T => {

    if (isArray(struct)) {

        return (struct as unknown as Array<any>).reduce((acc: Array<any>, val: any) => {

            if (typeof val === 'string') acc.push(val);
            else if (typeof val === 'number') acc.push(val);
            else if (val === undefined) acc.push(undefined);
            else acc.push(clone(val, f));
            return acc;
        }, []) as T

    } else if (isObject(struct)) {

        const klone: ObjectStruct = {};
        for (let k of (Object.keys(struct as any))) {

            if (typeof (struct as any)[k] === 'string') (klone as any)[k] = (struct as any)[k];
            else if (typeof (struct as any)[k] === 'number') (klone as any)[k] = (struct as any)[k];
            else if ((struct as any)[k] === undefined) (klone as any)[k] = undefined;
            else (klone as any)[k] = clone((struct as any)[k], f)
        }
        return klone as T;

    } else {

        return (f ? f(struct) : jsonClone(struct)) as T;
    }
};


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