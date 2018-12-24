import {isDefined} from './predicate';
import {to} from './objectstruct';
import {on} from './comparator';
import {identity} from './core';


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


const nop = () => {};


export const doNothing = nop;

