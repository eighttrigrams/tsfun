import {identical21} from "../core";


export const clone = <O>(object: O, postProcess:
    Function // TODO make more specific
    = identical21): O =>
    (postProcess)(object, JSON.parse(JSON.stringify(object))) as O;


// TODO do it with curry2 and reverse params method of getElForPathIn
// put to arrays
export const to = (path: string) => (object: any) =>
    getElForPathIn(object, path);


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