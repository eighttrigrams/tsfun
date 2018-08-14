// Written with Thomas Kleinke
export const getAtIndex = <A>(as: Array<A>) => (i: number): A|undefined => getAtIndexOr(as)(i);


// Written with Thomas Kleinke
export const getAtIndexOr = <A>(as: Array<A>, defaultValue: A|undefined = undefined) => (i: number): A|undefined =>
    as.length < i ? defaultValue : as[i];