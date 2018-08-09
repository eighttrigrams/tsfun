import {subtract} from './arrays/set_like';
import {subtractMap} from './maps/set_like';
import {UntypedMap} from "./maps/core";


export function copy<T>(as: Array<T>): Array<T>;
export function copy(as: UntypedMap): UntypedMap;
export function copy<T>(coll: Array<T>|UntypedMap): Array<T>|UntypedMap {

    return coll instanceof Array
        ? subtract([])(coll as any) as Array<T>
        : subtractMap([])(coll);
}


export function isUndefinedOrEmpty(object: any): boolean { // TODO unit test, maybe type param better, put to predicates

    if (!object) return true;

    return object instanceof Array
        ? object.length === 0
        : Object.keys(object).length === 0;
}


export function isEmpty(object: any): boolean { // TODO unit test, maybe type param better, put to predicates

    return object instanceof Array
        ? object.length === 0
        : Object.keys(object).length === 0;
}