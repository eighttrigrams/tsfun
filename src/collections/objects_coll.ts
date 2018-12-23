import {ObjectCollection} from '../types';

export const mapProperties = <A, B>(f: (_: A) => B) =>
    (keys: Array<number|string>, o: ObjectCollection<A>): ObjectCollection<B> =>
        keys.reduce(mapPropertiesReducer(f)(o), {});

const mapPropertiesReducer = <A, B>(f: (_: A) => B) => (o: any) => (acc: any, val: string) => (acc[val] = f(o[val]), acc);