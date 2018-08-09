export type Predicate<A> = (_: A) => boolean;

export const isNot = <A>(f: Predicate<A>) =>
    (a: A) => flip(f(a));

export const isDefined: Predicate<any> = (_: any) => _ !== undefined;

export const isUndefined: Predicate<any> = isNot(isDefined);

export const flip = (v: boolean) => !v;

export const even: () => Predicate<number> = () => (n: number) => n % 2 === 0;

export const odd: () => Predicate<number> = () => (n: number) => isNot(even())(n);

export const isArray: Predicate<any> = (as: any) => as instanceof Array;