import {isDefined} from 'tsfun-core';
import {to} from './objectstruct';


// ------------ @author Daniel de Oliveira -----------------

/* experimental */ export const doWhen = (when: Function, do_: Function) =>
    (other: any) => { if (when(other)) do_() };


/* experimental */ export const doWhile = (test: Function, do_: Function) =>
    (other: any) => {
        while (test(other)) other = do_(other);
    };


/* experimental */ export const doTimes = (times: number, do_: Function) => {
        for (let i = 0; i < times; i++) do_();
    };


/* experimental */ export const addTo = <A>(as: Array<A>) => (a: A) => as.push(a);


/* experimental */ export const mapTo = (path: string, as: any[]) =>
    as
        .map(to(path))
        .filter(isDefined);


/* experimental */ const nop = () => {};


/* experimental */ export const doNothing = nop;

