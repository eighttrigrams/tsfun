import {ObjectCollection} from './type';
import {zip} from "./arraylist";

export const lookup = <A>(oc: ObjectCollection<A>) => (targetId: string): A => oc[targetId];

export function keysAndValues<T>(o: ObjectCollection<T>): Array<[string, T]> {

    return zip(Object.keys(o))(Object.values(o)) as Array<[string, T]>;
}
