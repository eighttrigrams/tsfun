/**
 * @author Daniel de Oliveira
 */


export function reverse<A>(as: Array<A>): Array<A> { return as.reverse(); }


export const flatMap = <A>(f: (_: A) => Array<A>) => (as: Array<A>): Array<A> =>
    as.length < 1
        ? []
        : as.reduce((acc, val: A) => acc.concat(f(val) as any),[]);

