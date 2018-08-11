import {subtract} from './arrays/set_like';
import {subtractMap} from './maps/set_like';
import {UntypedMap} from './types';


export function copy<T>(as: Array<T>): Array<T>;
export function copy(as: UntypedMap): UntypedMap;
export function copy<T>(coll: Array<T>|UntypedMap): Array<T>|UntypedMap {

    return coll instanceof Array
        ? subtract([])(coll as any) as Array<T>
        : subtractMap([])(coll);
}


