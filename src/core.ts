// ------------ @author Daniel de Oliveira -----------------


// varargs support?
export const identity = <A>(v: A) => v;


export const identical = identity;


export const reverseUncurry2 = <A>(f: (_1: A, _2: A) => A) =>
    (as1: A) => (as2: A) => f(as2, as1);


export const uncurry2 = <A>(f: (_: Array<A>) => (_: Array<A>) => Array<A>) =>
    (as1: Array<A>, as2: Array<A>): Array<A> => f(as1)(as2);


export function throwIllegalArgs(f: string, expectation: string, got?: any) {

    throw new Error(`illegal argument in 'tsfun|${f}' - ${expectation} expected ${got ? '- got: ' + JSON.stringify(got) : ''}`)
}
