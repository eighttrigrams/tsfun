/**
 * @author Daniel de Oliveira
 */
import {intersect, subtract} from "./sets";
import {reducer, identical} from "./core";

export const subtractO = (subtrahend: Array<string|number>|any) =>
    (o: {[prop: string]: any}): {[prop: string]: any} => {

        if (Array.isArray(o)) throw new TypeError('invalid argument');

        const result = Array.isArray(subtrahend)
            ? (subtract(subtrahend.map(_ => _.toString()))(Object.keys(o)))
                .reduce(reducer(identical)(o), {})
            : (subtract(Object.keys(subtrahend))(Object.keys(o)))
                .reduce(reducer(identical)(o), {});

        return (Array.isArray(o)) ? Object.values(result) : result;
    };


export const uniteO = (addend: Array<string|number>|any) =>
    (o: {[prop: string]: any}): {[prop: string]: any} => {

        if (Array.isArray(addend)
            || Array.isArray(o)) throw new TypeError('invalid argument');

        return Object.assign({}, o, addend);
    };


export const intersectO = (o1: any) =>
    (o2: {[prop: string]: any}): {[prop: string]: any} => {

        if (Array.isArray(o2)) throw new TypeError('invalid argument');

        return intersect(
            Array.isArray(o1)
                ? o1.map(x => x.toString())
                : Object.keys(o1))
        (Object.keys(o2))
            .reduce(reducer(identical)(!Array.isArray(o1) ? o1 : o2), {});
    };
