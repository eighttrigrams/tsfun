import {ArrayCollection, ObjectCollection, UntypedObjectCollection} from '../types';
import {subtract} from './arrays_set_like';
import {subtractObject} from './objects_set_like';
import {isDefined} from '../predicates';


export function copy<T>(as: ArrayCollection<T>): ArrayCollection<T>;
export function copy(as: UntypedObjectCollection): UntypedObjectCollection;
export function copy<T>(coll: ArrayCollection<T>|UntypedObjectCollection): ArrayCollection<T>|UntypedObjectCollection {

    return coll instanceof Array // TODO test with isArray
        ? subtract([])(coll as any) as ArrayCollection<T>
        : subtractObject([])(coll);
}




