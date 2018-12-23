import {ArrayList, UntypedObjectCollection} from '../types';
import {subtract} from './arrays_set_like';
import {subtractObject} from './objects_set_like';


export function copy<T>(as: ArrayList<T>): ArrayList<T>;
export function copy(as: UntypedObjectCollection): UntypedObjectCollection;
export function copy<T>(coll: ArrayList<T>|UntypedObjectCollection): ArrayList<T>|UntypedObjectCollection {

    return coll instanceof Array // TODO test with isArray
        ? subtract([])(coll as any) as ArrayList<T>
        : subtractObject([])(coll);
}




