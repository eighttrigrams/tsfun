export declare type NestedArray<A> = Array<Array<A>>;
export declare const intersection: <A>(aas: A[][]) => A[];
export declare const union: <A>(aas: A[][]) => A[];
export declare const intersect: <A>(as1: A[]) => (as2: A[]) => A[];
/**
 * Generate a new list with elements which are contained in l but not in subtrahend
 */
export declare const subtract: <A>(subtrahend: A[]) => (as: A[]) => A[];
/**
 * @returns the union of a1 and a2
 */
export declare const unite: <A>(as1: A[]) => (as2: A[]) => A[];
