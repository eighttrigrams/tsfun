import {Predicate} from './type';
import {isNot, on, isUndefined, isDefined, isUndefinedOrEmpty, isEmpty} from 'tsfun-core';

// ------------ @author Daniel de Oliveira -----------------

export const not = isNot;


export const defined = isDefined;


const Undefined = isUndefined;


export const undefinedOrEmpty = isUndefinedOrEmpty;


export const empty = isEmpty;


export const isString: Predicate<any> = (as: any) => typeof as === 'string';


export const has = (path: string) => (o: Object) => on(path, isDefined)(o);


export const hasNot = (path: string) => (o: Object) => not(on(path, isDefined))(o);