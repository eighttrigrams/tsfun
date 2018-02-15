/**
 * @author Daniel de Oliveira
 */


type Transformation<A> = (_: Array<A>) => Array<A>;

/**
 * A flow is a transformation from Array of A to Array of A, consisting
 * of n transformation steps, where n >= 0.
 */
export const flow = <T>(t: T, ...transformations: Array<(_: T) => T>) =>
    transformations.reduce((acc, transformation) => transformation(acc), t);


export const flowP = <T>(...transformations: Array<(_: T) => T>) =>
    (t: T) =>
        transformations.reduce((acc, transformation) => transformation(acc), t);


// These are special versions of the javascript array methods that work within
// the core constraint posed by flow: They take as well as return an Array of A.

export const reduce = <A>(f: (acc: Array<A>, val: A) => Array<A>): Transformation<A> =>
    (as: Array<A>) => as.reduce(f, []);


export const map = <A>(f: (_: A) => A): Transformation<A> =>
    (as: Array<A>) => as.map(f);


export const filter = <A>(predicate: (_: A) => boolean): Transformation<A> =>
    (as: Array<A>) => as.filter(predicate);


export const reverse = <A>(): Transformation<A> =>
    (as: Array<A>) => as.reverse();


