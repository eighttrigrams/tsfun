/**
 * @author Daniel de Oliveira
 */
export declare const times: (l: number) => (r: number) => number;
export declare const identical: <A>(v: A) => A;
export declare const includedIn: <A>(as: A[]) => (a: A) => boolean;
export declare const differentFrom: <A>(a: A) => (a: A) => boolean;
export declare const sameAs: <A>(l: A) => (r: A) => boolean;
export declare const smaller: <A>(l: A) => (r: A) => boolean;
export declare const bigger: <A>(l: A) => (r: A) => boolean;
export declare const isNot: <A>(f: (_: A) => boolean) => (a: A) => boolean;
export declare const flip: (v: boolean) => boolean;
export declare const uncurry2: <A>(f: (_: A[]) => (_: A[]) => A[]) => (as1: A[], as2: A[]) => A[];
