import {TypedMap} from '../types';

export const mapProperties = <A, B>(f: (_: A) => B) => (keys: Array<number|string>, o: TypedMap<A>): TypedMap<B> =>
    keys.reduce(reducer(f)(o), {});

const reducer = <A, B>(f: (_: A) => B) => (o: any) => (acc: any, val: string) => (acc[val] = f(o[val]), acc);