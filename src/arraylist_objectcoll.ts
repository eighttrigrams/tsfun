import {ArrayList, UntypedObjectCollection} from './type';
import {subtract} from './arrayset';
import {subtractObject} from './objectset';


// ------------ @author Daniel de Oliveira -----------------




export function copy<T>(as: ArrayList<T>): ArrayList<T>;
export function copy(as: UntypedObjectCollection): UntypedObjectCollection;
export function copy<T>(coll: ArrayList<T>|UntypedObjectCollection): ArrayList<T>|UntypedObjectCollection {

    return coll instanceof Array // TODO test with isArray
        ? subtract([])(coll as any) as ArrayList<T>
        : subtractObject([])(coll);
}






