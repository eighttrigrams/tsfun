import {ObjectCollection, UntypedObjectCollection} from './type';
import {zip} from "./arraylist";

export const lookup = <A>(oc: ObjectCollection<A>) => (targetId: string): A => oc[targetId];

export function keysAndValues<T>(o: ObjectCollection<T>): Array<[string, T]> {

    return zip(Object.keys(o))(Object.values(o)) as Array<[string, T]>;
}


export function keys(o: UntypedObjectCollection): string[] {

    return Object.keys(o);
}


export function values<T>(o: ObjectCollection<T>): Array<T> {

    return Object.values(o);
}
