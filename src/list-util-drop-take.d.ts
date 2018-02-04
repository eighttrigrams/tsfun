/**
 * @author Daniel de Oliveira
 */
export declare const take: <A>(n: number) => (as: A[]) => A[];
export declare const takeWhile: <A>(predicate: (_: A) => boolean) => (as: A[]) => A[];
export declare const takeRightWhile: <A>(predicate: (_: A) => boolean) => (as: A[]) => A[];
export declare const takeUntil: <A>(predicate: (_: A) => boolean) => (as: A[]) => A[];
export declare const dropWhile: <A>(predicate: (_: A) => boolean) => (as: A[]) => A[];
