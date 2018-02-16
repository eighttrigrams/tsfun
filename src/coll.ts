import {subtract} from './sets';
import {subtractO} from './sets-o';
/**
 * @author Daniel de Oliveira
 */



export function copy<T>(as: Array<T>): Array<T>;
export function copy(as: {[prop: string]: any|undefined}): {[prop: string]: any|undefined};
export function copy<T>(coll: Array<T>|{[prop: string]: any|undefined}): Array<T>|{[prop: string]: any|undefined} {

    return coll instanceof Array
        ? subtract([])(coll as any) as Array<T>
        : subtractO([])(coll);
}