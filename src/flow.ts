import {Transformation} from './types';

// A flow is a transformation from Array of A to Array of A, consisting
// of n transformation steps, where n >= 0.

export const flow = <T>(t: T, ...transformations: Array<Transformation<T>>) =>
    transformations.reduce((acc, transformation) => transformation(acc), t);


export const flowP = <T>(...transformations: Array<Transformation<T>>) =>
    (t: T) =>
        transformations.reduce((acc, transformation) => transformation(acc), t);





