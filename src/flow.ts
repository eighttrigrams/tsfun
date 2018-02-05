/**
 * @author Daniel de Oliveira
 */


// A flow is a transformation from Array of A to Array of A, consisting
// of one or more tranformation steps

export const flow = <A>(collection: Array<A>, ...fs: Array<(_: Array<A>) => Array<A>>) =>
    fs.reduce((acc, f) => f(acc), collection);


// These are special versions of the javascript array methods that work within
// the core constraint posed by flow: They take as well as return an Array of A.

export const reduce = <A>(f: (acc: Array<A>, val: A) => Array<A>) =>
    (as: Array<A>) => as.reduce(f, []);


export const map = <A>(f: (_: A) => A) =>
    (as: Array<A>) => as.map(f);


export const filter = <A>(predicate: (_: A) => boolean) =>
    (as: Array<A>) => as.filter(predicate);


export const reverse = <A>(as: Array<A>) => as.reverse();


