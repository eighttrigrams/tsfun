/**
 * @author Daniel de Oliveira
 */
export type Transformation<T> = (_: T) => T;

export const identical = <A>(v: A) => v;

export const identical21 = <A>(_: A, a: A) => a;

export const uncurry2 = <A>(f: (_: Array<A>) => (_: Array<A>) => Array<A>) =>
    (as1: Array<A>, as2: Array<A>): Array<A> => f(as1)(as2);

// TODO unit test, maybe find a better place for the function. make when type more specific
export const doWhen = (when: Function, do_: Function) =>
    (other: any) => { if (when(other)) do_() };

