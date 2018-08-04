import {subtract} from './arrays/set_like';
import {subtractMap} from './maps/set_like';
import {Transformation} from "./core";
import {UntypedMap} from "./maps/core";


/**
 * @author Daniel de Oliveira
 */


type ArrayTransformation<T> = Transformation<Array<T>>;

export function copy<T>(as: Array<T>): Array<T>;
export function copy(as: UntypedMap): UntypedMap;
export function copy<T>(coll: Array<T>|UntypedMap): Array<T>|UntypedMap {

    return coll instanceof Array
        ? subtract([])(coll as any) as Array<T>
        : subtractMap([])(coll);
}


export function isEmpty(object: any): boolean { // TODO unit test, maybe type param better

    return object instanceof Array
        ? object.length === 0
        : Object.keys(object).length === 0;
}