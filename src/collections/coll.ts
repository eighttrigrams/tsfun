import {UntypedMap} from '../types';
import {subtract} from './arrays_set_like';
import {subtractMap} from './maps_set_like';


export function copy<T>(as: Array<T>): Array<T>;
export function copy(as: UntypedMap): UntypedMap;
export function copy<T>(coll: Array<T>|UntypedMap): Array<T>|UntypedMap {

    return coll instanceof Array
        ? subtract([])(coll as any) as Array<T>
        : subtractMap([])(coll);
}


