import {List, Mapping} from './type';
import {isArray, isString} from './predicate';

export function split(pattern: any) {

    return (content: string) => content.split(pattern);
}


export function join(pattern: any) {

    return <A>(content: Array<A>): string => content.join(pattern);
}


export function toLowerCase(s: string) {

    return s.toLowerCase();
}


export function toUpperCase(s: string) {

    return s.toUpperCase();
}


export function append(...s2: Array<string>) {

    return (s1: string): string => {

        return s1.concat(s2.join(''))
    }
}


export function prepend(...s2: Array<string>) {

    return (s1: string): string => {

        return s2.join('').concat(s1)
    }
}