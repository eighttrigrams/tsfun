import {TypedMap, UntypedMap} from '../types';
import {subtract} from './arrays_set_like';
import {subtractObject} from './objects_set_like';
import {isDefined} from '../predicates';


export function copy<T>(as: Array<T>): Array<T>;
export function copy(as: UntypedMap): UntypedMap;
export function copy<T>(coll: Array<T>|UntypedMap): Array<T>|UntypedMap {

    return coll instanceof Array
        ? subtract([])(coll as any) as Array<T>
        : subtractObject([])(coll);
}


export const intoObject = <T>(keyName: string, valName: string) =>
    (object: TypedMap<T>, item: TypedMap<T>) =>
        isDefined(item[keyName])
            ? (object[(item[keyName]).toString()] = item[valName], object)
            : object;

