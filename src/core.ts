/**
 * @author Daniel de Oliveira
 */


export type Transformation<T> = (_: T) => T;

export const identical = <A>(v: A) => v;

export const flip = (v: boolean) => !v;

export const uncurry2 = <A>(f: (_: Array<A>) => (_: Array<A>) => Array<A>) =>
    (as1: Array<A>, as2: Array<A>): Array<A> => f(as1)(as2);

