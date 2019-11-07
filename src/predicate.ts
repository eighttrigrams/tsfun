import {isNot, on, isUndefined, isDefined, isUndefinedOrEmpty, isEmpty, Predicate} from 'tsfun-core';

// ------------ @author Daniel de Oliveira -----------------

export const not = isNot;


export const defined = isDefined;


const Undefined = isUndefined;


export const undefinedOrEmpty = isUndefinedOrEmpty;


export const empty = isEmpty;


export const has = (path: string) => (o: Object) => on(path, isDefined)(o);


export const hasNot = (path: string) => (o: Object) => not(on(path, isDefined))(o);


export function and(pred1: Predicate<any>, pred2: Predicate<any>) {

    return (argument: any): any => {

        return pred1(argument) && pred2(argument);
    }
}


export function or(pred1: Predicate<any>, pred2: Predicate<any>) {

    return (argument: any): any => {

        return pred1(argument) || pred2(argument);
    }
}


export function xor(pred1: Predicate<any>, pred2: Predicate<any>) {

    return (argument: any): any => {

        return (pred1(argument) && !pred2(argument)) || (!pred1(argument) && pred2(argument));
    }
}