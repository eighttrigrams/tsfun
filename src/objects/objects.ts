export const mapProperties = <A, B>(f: (_: A) => B) => (keys: Array<number|string>, o: objT<A>) =>
    keys.reduce(reducer(f)(o), {});

const reducer = <A, B>(f: (_: A) => B) => (o: any) => (acc: any, val: string) => (acc[val] = f(o[val]), acc);

export type obj = {[prop: string]: any|undefined};

export type objT<T> = {[prop: string]: T};