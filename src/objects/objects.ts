import {sameAs} from "../predicates";
import {identical21} from "../core";

export const mapProperties = <A, B>(f: (_: A) => B) => (keys: Array<number|string>, o: objT<A>) =>
    keys.reduce(reducer(f)(o), {});

const reducer = <A, B>(f: (_: A) => B) => (o: any) => (acc: any, val: string) => (acc[val] = f(o[val]), acc);

export type obj = {[prop: string]: any|undefined};

export type objT<T> = {[prop: string]: T};


export const clone = <O>(object: O, postProcess:
    Function // TODO make more specific
    = identical21): O =>
    (postProcess)(object, JSON.parse(JSON.stringify(object))) as O;


export function getElForPathIn(object: any, path: string) {

    let result = object;
    for (let segment of path.split('.')) {
        if (result[segment] || result[segment] === false) result = result[segment];
        else return result = undefined;
    }
    return result;
}


export function takeOrMake(object: Object, path: string, val: any) {

    if (getElForPathIn(object, path)) return getElForPathIn(object, path);
    let result: any = object;
    let last;
    let lastSegment: any;
    for (let segment of path.split('.')) {
        if (!result[segment]) result[segment] = { };
        last = result;
        lastSegment = segment;
        result = result[segment];
    }
    return last[lastSegment] = val;
}


// TODO unit test
// document, also mention the case that find(on(path, any)) can be used
// as a more specific version of find(equalTo(any))
//
// see also if there is some more abstract patterns in common with sameOn and equalOn
/**
 * Because of how it reads in context, of for example find
 * (.find(on('a.b', sameAs('cd')) we don't go with the usual curried style with comparison
 * as first arg here.
 */
export const on = (path: string, compare: Function|any) =>
    (object: any): boolean =>
        (typeof compare === 'function')
            ? compare(getElForPathIn(object, path))
            : sameAs(getElForPathIn(compare, path))
                (getElForPathIn(object, path));