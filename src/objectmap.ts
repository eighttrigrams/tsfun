import {ObjectCollection} from './type';

export const lookup = <A>(oc: ObjectCollection<A>) => (targetId: string): A => oc[targetId];