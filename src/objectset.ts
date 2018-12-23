import {intersect as intersectA, subtract as subtractA} from "./arrayset";
import {ObjectSet} from './types';
import {identical} from './core';
import {mapProperties} from './objectcoll';


// ------------ @author Daniel de Oliveira -----------------

export const subtractObject = (subtrahend: Array<string | number> | any) =>
    (o: ObjectSet): ObjectSet => {

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


export function unionObject([first, ...rest]: ObjectSet[]): ObjectSet {

    return first && rest.length > 0
        ? uniteObject(...rest)(first)
        : first
            ? first
            : {};
}


export const uniteObject = (...addends: ObjectSet[]) =>
    (o: ObjectSet): ObjectSet => {

        if (Array.isArray(o)) throw new TypeError('invalid argument');
        for (let addend of addends)
            if (Array.isArray(addend)) throw new TypeError('invalid argument');

        return Object.assign({}, o, ...addends);
    };


export const intersectObject = (o1: any) =>
    (o2: ObjectSet): ObjectSet => {

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


