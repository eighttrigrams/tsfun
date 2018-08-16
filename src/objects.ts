import {isDefined, isEmpty} from './predicates';
import {getElForPathIn, reverseUncurry2} from './core';
import {TypedMap} from './types';





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


export const option = <A>(f: (_: A) => boolean) =>
    (a: A) => f(a) ? a : {};


export const mapOption = <A>(f: (a: A) => A) =>
    (a: A) => isEmpty(a) ? {} : f(a);


export const to = reverseUncurry2(getElForPathIn);


export const intoObject = <T>(f: (_: any) => [string, T]) =>
    (object: TypedMap<T>, item: any) =>
        isDefined(f(item)[0])
            ? (object[f(item)[0]] = f(item)[1], object)
            : object;