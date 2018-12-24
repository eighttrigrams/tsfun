import {isDefined} from './predicate';
import {to} from './objectstruct';
import {on} from './comparator';


// ------------ @author Daniel de Oliveira -----------------

export const doWhen = (when: Function, do_: Function) =>
    (other: any) => { if (when(other)) do_() };


export const doWhile = (test: Function, do_: Function) =>
    (other: any) => {
        while (test(other)) other = do_(other);
    };


export const doTimes = (times: number, do_: Function) => {
        for (let i = 0; i < times; i++) do_();
    };


export const addTo = <A>(as: Array<A>) => (a: A) => as.push(a);


export const mapTo = (path: string, as: any[]) =>
    as
        .map(to(path))
        .filter(isDefined);


export const nop = () => {};


export const doNothing = nop;


export const sameOn = <T>(path: string, l: T, r: T) =>
    on(path)(l)(r);

