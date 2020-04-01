import {Associative, Map} from './type';
import {val} from './composition';
import {isArray, isAssociative, isEmpty, isObject, isString, isUndefinedOrEmpty} from './predicate';
import {reverseUncurry2} from './core';
import {copy} from './collection';
import {join} from './string';
import {rest} from './list';


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
        }, {} as Object) as T;

    } else {

        return (f ? f(struct) : jsonClone(struct)) as T;
    }
}


export function getOn<T>(path: string|Array<string|number>, alternative?: any) {

    return (ds: Object) => {

        const result = getElForPathIn(ds as Object, path);
        return result !== undefined ? result : alternative;
    }
}


export const lookupOn = <T>(ds: Object, alternative?: T) => (path: string|Array<string|number>) => {

    return getOn(path, alternative)(ds);
};


export function updateOn(path_: string|Array<string|number>, update_fun?: (val: any) => any) {

    return (struct: Object): any => _update(path_, struct, update_fun)
}


export const assocOn = (path: string|Array<string|number>, v: any) => updateOn(path, val(v));


export const dissocOn = (path: string|Array<string|number>) => updateOn(path);


function _update(path_: string|Array<string|number>,
                 struct: Object,
                 update_fun?: (val: any) => any) {

    const pathSegments = (isString(path_) ? path(path_ as any) : path_) as Array<string|number>;

    const pathSegment = pathSegments[0];
    const copied = copy(struct) as Map;

    if (pathSegments.length === 1) {
        if (update_fun) copied[pathSegment] = update_fun(copied[pathSegment]);
        else delete copied[pathSegment];
    } else {
        pathSegments.shift();
        if (update_fun || copied[pathSegment] !== undefined) {
            copied[pathSegment] = _update(pathSegments, copied[pathSegment], update_fun);
        }
    }
    return copied;
}


export function to<T = any>(path: string|Array<string|number>) {

    return (s: any) => (reverseUncurry2(getElForPathIn))(path)(s) as T;
}


function makeValueForCurrentKey(resultSegment: any) {
    return (resultSegment
        || resultSegment === ''
        || resultSegment === 0
        || resultSegment === false)
        ? resultSegment
        : undefined;
}


const isObject_ = (o: any) => o instanceof Object;


// library internal
export function getElForPathIn(object: any, path_: string|Array<string|number>): any {

    if (!path_ || path_.length < 1) return undefined;

    return _getElForPathIn(object,
        (isString(path_) ? path(path_ as string) : path_) as Array<string|number>);
}


export function _getElForPathIn(object: any, path: Array<string|number>): any {

    const key = path[0];

    if (path.length === 1) {

        if (isString(key)) {
            if (isObject_(object)) return makeValueForCurrentKey(object[key]);
            else return undefined;
        } else {
            if (isArray(object)) return makeValueForCurrentKey(object[key]);
            else return undefined;
        }

    } else {
        return object[key]
            ? _getElForPathIn(object[key], rest(path))
            : undefined;
    }
}


export function path(path: string): Array<number|string>;
export function path(path: Array<number|string>): string;
export function path(path: string|Array<number|string>): string|Array<number|string> {

    if (isString(path)) {

        const segments = [];
        let current = '';
        for (let i = 0; i < path.length; i++) {
            if (path[i] !== '[' && path[i] !== '.' && path[i] !== ']') {
                current += path[i];
            } else {
                if (path[i] === ']') {
                    segments.push(parseInt(current));
                } else {
                    if (current) segments.push(current);
                }
                current = '';
            }
        }
        if (current) segments.push(current);
        return segments;

    } else {

        let joined = (path as Array<number|string>).map((segment: any) => {

            return isString(segment)
                ? '.' + segment + '.'
                : '[' + segment.toString() + ']';

        }).join('').replace('..', '.').replace('.[', '[');

        if (joined.startsWith('.')) joined = joined.slice(1);
        if (joined.endsWith('.')) joined = joined.slice(0, joined.length-1);
        return joined;
    }
}