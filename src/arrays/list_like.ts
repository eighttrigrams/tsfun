/**
 * @author Daniel de Oliveira
 */
import {to} from '../objects/core';
import {isDefined} from '../predicates';


export function reverse<A>(as: Array<A>): Array<A> { return as.reverse(); }


export const flatMap = <A>(f: (_: A) => Array<A>) => (as: Array<A>): Array<A> =>
    as.length < 1
        ? []
        : as.reduce((acc, val: A) => acc.concat(f(val) as any),[]);


export const mapTo = (path: string) => (as: any[]) =>
    as
        .map(to(path))
        .filter(isDefined); // TODO make defined predicate


// TODO make map function which is type overloaded with map function in maps
