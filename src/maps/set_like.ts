import {intersect as intersectA} from "../arrays/set_like";
import {subtract as subtractA} from "../arrays/set_like";
import {identical} from "../core";
import {mapProperties} from './core';
import {UntypedMap} from '../types';


export const subtractMap = (subtrahend: Array<string | number> | any) =>
    (o: UntypedMap): UntypedMap => {

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


export function unionMap([first, ...rest]: UntypedMap[]): UntypedMap {

    return first && rest.length > 0
        ? uniteMap(...rest)(first)
        : first
            ? first
            : {};
}


export const uniteMap = (...addends: UntypedMap[]) =>
    (o: UntypedMap): UntypedMap => {

        if (Array.isArray(o)) throw new TypeError('invalid argument');
        for (let addend of addends)
            if (Array.isArray(addend)) throw new TypeError('invalid argument');

        return Object.assign({}, o, ...addends);
    };


export const intersectMap = (o1: any) =>
    (o2: UntypedMap): UntypedMap => {

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


