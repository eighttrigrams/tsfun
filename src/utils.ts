import {isDefined} from './predicates';
import {to} from './struct';

export const doWhen = (when: Function, do_: Function) =>
    (other: any) => { if (when(other)) do_() };


export const addTo = <A>(as: Array<A>) => (a: A) => as.push(a);


export const mapTo = (path: string, as: any[]) =>
    as
        .map(to(path))
        .filter(isDefined);