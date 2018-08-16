import {isDefined} from '../predicates';
import {Predicate, Transformation} from '../types';
import {to} from '../objects';


export const reverse = <A>(as: Array<A>): Array<A> =>
    as.reverse();


export const append = <A>(as2: Array<A>) => (as: Array<A>) =>
    as.concat(as2);


export const prepend = <A>(as2: Array<A>) => (as: Array<A>) =>
    as2.concat(as);


export const flatMap = <A>(f: (_: A) => Array<A>): Transformation<Array<A>> =>
    (as: Array<A>) =>
        as.length < 1
            ? []
            : as.reduce((acc, val: A) => acc.concat(f(val) as any),[]);


export const map = <A>(f: (_: A) => A): Transformation<Array<A>> =>
    (as: Array<A>): Array<A> => as.map(f);


export const filter = <A>(f: Predicate<A>): Transformation<Array<A>> =>
    (as: Array<A>) =>
        as.filter(f);




