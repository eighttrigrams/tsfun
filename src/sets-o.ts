/**
 * @author Daniel de Oliveira
 */
import {intersect, subtract} from "./sets";
import {identical, reduceO, obj} from "./core";

export const subtractO = (subtrahend: Array<string|number>|any) =>
    (o: obj): obj => {

        if (Array.isArray(o)) throw new TypeError('invalid argument');

        return reduceO(identical)(
            Array.isArray(subtrahend)
                ? (subtract(subtrahend.map(_ => _.toString()))(Object.keys(o)))
                : (subtract(Object.keys(subtrahend))(Object.keys(o)))
            , o);
    };


export const uniteO = (addend: Array<string|number>|any) =>
    (o: obj): obj => {

        if (Array.isArray(addend)
            || Array.isArray(o)) throw new TypeError('invalid argument');

        return Object.assign({}, o, addend);
    };


export const intersectO = (o1: any) =>
    (o2: obj): obj => {

        if (Array.isArray(o2)) throw new TypeError('invalid argument');

        const intersectingKeys = intersect(
                Array.isArray(o1)
                    ? o1.map(x => x.toString())
                    : Object.keys(o1)
            )(Object.keys(o2));

        return reduceO(identical)(
            intersectingKeys,
            (!Array.isArray(o1) ? o1 : o2)
        );
    };
