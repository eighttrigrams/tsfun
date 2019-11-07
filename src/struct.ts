import {getElForPathIn, isArray, isObject, convertPath, isString} from 'tsfun-core';
import {reverseUncurry2} from './core';
import {ObjectStruct, UntypedObjectCollection} from './type';
import {val} from 'tsfun-core';
import {copy} from './associative';


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
    if (typeof struct === 'string') return struct as string;
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


export function getOn<T>(path: string, alternative?: any) {

    return (ds: ObjectStruct) => {

        const result = getElForPathIn(ds as Object, path);
        return result !== undefined ? result : alternative;
    }
}


export const lookupOn = <T>(ds: ObjectStruct, alternative?: T) => (path: string) => {

    return getOn(path, alternative)(ds);
};


function applyUpdate(copied: any, key: string|number, update_fun?: (val: any) => any) {

    if (update_fun) copied[key] = update_fun((copied as any)[key]);
    else delete copied[key];
}


export function updateOn(path: string, update_fun?: (val: any) => any) {

    return (struct: ObjectStruct): any => _update(convertPath(path), struct, update_fun)
}


function _update(path: Array<string|number>, struct: ObjectStruct, update_fun?: (val: any) => any, ) {

    const key = path[0];
    let copied = undefined;

    if (path.length === 1) {
        copied = isString(key)
            ? Object.assign({}, struct) as UntypedObjectCollection
            : copy(struct as any) as UntypedObjectCollection;

        applyUpdate(copied, key, update_fun);

    } else {
        copied = isString(key)
            ? Object.assign({}, struct) as UntypedObjectCollection
            : copy(struct as any) as UntypedObjectCollection;

        path.shift();
        copied[key] = _update(path, copied[key], update_fun);
    }
    return copied;
}


export const assocOn = (path: string, v: any) => updateOn(path, val(v));


export const dissocOn = (path: string) => updateOn(path);


export const to = reverseUncurry2(getElForPathIn);