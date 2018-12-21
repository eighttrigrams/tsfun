// Written with Thomas Kleinke
export const getIth = <A>(as: Array<A>) => (i: number): A|undefined => getIthOr(as)(i);


// Written with Thomas Kleinke
export const getIthOr = <A>(as: Array<A>, defaultValue: A|undefined = undefined) => (i: number): A|undefined =>
    as.length < i ? defaultValue : as[i];