/**
 * @author Daniel de Oliveira
 */
import {intersect as intersectA} from "../arrays/sets";
import {subtract as subtractA} from "../arrays/sets";
import {identical} from "../core";
import {mapProperties, obj} from './objects';

export const subtract = (subtrahend: Array<string | number> | any) =>
    (o: obj): obj => {

        if (Array.isArray(o)) throw new TypeError('invalid argument');

        const keys =
            (
                Array.isArray(subtrahend)
                    ? subtractA(subtrahend.map(_ => _.toString()))
                    : subtractA(Object.keys(subtrahend))

            )(Object.keys(o));

        return mapProperties(identical)(
            keys,
            o);
    };


export function union([first, ...rest]: obj[]): obj {

    return first && rest && rest.length > 0
        ? unite(...rest)(first)
        : first
            ? first
            : {};
}


export const unite = (...addends: obj[]) =>
    (o: obj): obj => {

        if (Array.isArray(o)) throw new TypeError('invalid argument');
        for (let addend of addends)
            if (Array.isArray(addend)) throw new TypeError('invalid argument');

        return Object.assign({}, o, ...addends);
    };


export const intersect = (o1: any) =>
    (o2: obj): obj => {

        if (Array.isArray(o2)) throw new TypeError('invalid argument');

        const keys = intersectA(
            Array.isArray(o1)
                ? o1.map(x => x.toString())
                : Object.keys(o1)
        )(Object.keys(o2));

        return mapProperties(identical)(
            keys,
            (!Array.isArray(o1) ? o1 : o2)
        );
    };
