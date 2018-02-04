/**
 * @author Thomas Kleinke
 * @author Daniel de Oliveira
 */
export declare const getAtIndex: <A>(as: A[], i: number) => A | undefined;
export declare const getAtIndexOr: <A>(as: A[], i: number, defaultValue?: A | undefined) => A | undefined;
export declare const removeAtIndex: <A>(as: A[]) => (i: number) => A[];
