/**
 * @author Daniel de Oliveira
 */
export declare const flow: <A>(...fs: ((_: A[]) => A[])[]) => (collection: A[]) => A[];
export declare const map: <A>(f: (_: A) => A) => (as: A[]) => A[];
export declare const filter: <A>(predicate: (_: A) => boolean) => (as: A[]) => A[];
export declare const reverse: <A>(as: A[]) => A[];
