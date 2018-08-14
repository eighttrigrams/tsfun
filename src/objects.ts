import {isEmpty} from './predicates';




// library internal
export function getElForPathIn(object: any, path: string) {

    let result = object;
    for (let segment of path.split('.')) {
        if (result[segment]
            || result[segment] === ''
            || result[segment] === 0
            || result[segment] === false) result = result[segment];
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


export const option = <A>(f: (_: A) => boolean) =>
    (a: A) => f(a) ? a : {};


export const mapOption = <A>(f: (a: A) => A) =>
    (a: A) => isEmpty(a) ? {} : f(a);