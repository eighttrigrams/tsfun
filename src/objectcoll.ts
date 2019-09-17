import {ObjectCollection} from './type';
import {isDefined} from './predicate';
import {zip} from './arraylist';


// ------------ @author Daniel de Oliveira -----------------


export function keysAndValues<T>(o: ObjectCollection<T>) {

    return zip(Object.keys(o))(Object.values(o));
}



