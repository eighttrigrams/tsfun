

export const identical = <A>(v: A) => v;

export const identical21 = <A>(_: A, a: A) => a;

// TODO do not limit to Array<A>, work on A instead
export const uncurry2 = <A>(f: (_: Array<A>) => (_: Array<A>) => Array<A>) =>
    (as1: Array<A>, as2: Array<A>): Array<A> => f(as1)(as2);


export const reverseUncurry2 = <A>(f: (_1: A, _2: A) => A) =>
    (as1: A) => (as2: A) => f(as2, as1);


export const doWhen = (when: Function, do_: Function) =>
    (other: any) => { if (when(other)) do_() };

