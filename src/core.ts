// ------------ @author Daniel de Oliveira -----------------


export const identity = <A>(v: A) => v;


export const identical = identity;


export const reverseUncurry2 = <A>(f: (_1: A, _2: A) => A) =>
    (as1: A) => (as2: A) => f(as2, as1);












