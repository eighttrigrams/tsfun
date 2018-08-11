export type Predicate<A> = (_: A) => boolean;


export const isNot = <A>(f: Predicate<A>) =>
    (a: A) => flip(f(a));


export const isDefined: Predicate<any> = (_: any) => _ !== undefined;


export const isUndefined: Predicate<any> = isNot(isDefined);


export const flip = (v: boolean) => !v;


export const isEven: Predicate<number> = (n: number) => n % 2 === 0;


export const isOdd: Predicate<number> = (n: number) => isNot(isEven)(n);


export const isArray: Predicate<any> = (as: any) => as instanceof Array;


export const isTrue: Predicate<boolean> = (b: boolean) => b === true;


export const isFalse: Predicate<boolean> = (b: boolean) => b === false;