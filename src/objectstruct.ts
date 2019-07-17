import {isArray, isEmpty, isObject} from './predicate';
import {reverseUncurry2} from './core';
import {ArrayList, ObjectStruct, Predicate} from './type';
import {on} from './comparator';
import {copyObj} from './objectcoll';


// ------------ @author Daniel de Oliveira -----------------

export const jsonClone = <T>(object: T) => JSON.parse(JSON.stringify(object)) as T;


export function clone<T>(struct: boolean, f?: Function): boolean;
export function clone<T>(struct: string, f?: Function): string;
export function clone<T>(struct: number, f?: Function): number;
export function clone<T>(struct: undefined, f?: Function): undefined;
export function clone<T>(struct: T, f?: Function): T;
export function clone<T>(struct: T|undefined|number|string|boolean, f?: Function): T|undefined|number|string|boolean {

    if (struct === undefined) return undefined;
    if (typeof struct === 'boolean') return struct as boolean;
    if (typeof struct === 'string') return struct as string; // TODO make predicates isString, isBoolean, isNumber for internal use
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


export const getOnOr = <T>(path: string, alternative: any) => (ds: ObjectStruct) => {

    const result = getElForPathIn(ds as Object, path);
    return result !== undefined
        ? result
        : alternative;
};


export const getOn = <T>(ds: ObjectStruct) => (path: string) => {

    const result = getOnOr(path, undefined)(ds);
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



export function setOn(object: any /* TODO ObjectStruct */, path: string) {

    return (val: any): void => {

        const segments = path.split('.');

        segments.reduce((currentLevel, segment, i) => {
            if (i === segments.length - 1) { // last segment
                currentLevel[segment] = val;
                return currentLevel; // does not matter
            } else {
                if (!currentLevel[segment]) currentLevel[segment] = {};
                return currentLevel[segment];
            }
        }, object);
    }
}


export function update(path: string, update_fun: (val: any) => any) { return (object: ObjectStruct) => { // TODO make generic typing

    if (!path.includes('.')) {

        const copied = copyObj(object);
        copied[path] = update_fun((object as any)[path]);
        return copied;
    }

    const splittedPath = path.split('.');
    const copied = copyObj(object);

    const firstElem = splittedPath[0];
    splittedPath.shift();
    copied[firstElem] = update(splittedPath.join('.'), update_fun)((object as any)[firstElem]);
    return copied;
}}


export const assoc = (path: string, val: any) => update(path, () => val);


export const to = reverseUncurry2(getElForPathIn);


/* experimental */ export const sameOn = <T>(path: string, l: T, r: T) =>
    on(path)(l)(r);


/* experimental */ export const option = <A>(f: Predicate<A>) =>
    (a: A) => f(a) ? a : {};


/* experimental */ export const mapOption = <A>(f: (a: A) => A) =>
    (a: A) => isEmpty(a) ? {} : f(a);