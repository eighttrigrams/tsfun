/**
 * @author Daniel de Oliveira
 */
import {intersect as intersectA} from "../arrays/sets";
import {subtract as subtractA} from "../arrays/sets";
import {identical, reduceO, obj} from "../core";

    export const subtract = (subtrahend: Array<string | number> | any) =>
        (o: obj): obj => {

            if (Array.isArray(o)) throw new TypeError('invalid argument');

            const keys =
                (
                    Array.isArray(subtrahend)
                        ? subtractA(subtrahend.map(_ => _.toString()))
                        : subtractA(Object.keys(subtrahend))

                )(Object.keys(o));

            return reduceO(identical)(
                keys,
                o);
        };


    export const unite = (addend: Array<string | number> | any) =>
        (o: obj): obj => {

            if (Array.isArray(addend)
                || Array.isArray(o)) throw new TypeError('invalid argument');

            return Object.assign({}, o, addend);
        };


    export const intersect = (o1: any) =>
        (o2: obj): obj => {

            if (Array.isArray(o2)) throw new TypeError('invalid argument');

            const keys = intersectA(
                Array.isArray(o1)
                    ? o1.map(x => x.toString())
                    : Object.keys(o1)
            )(Object.keys(o2));

            return reduceO(identical)(
                keys,
                (!Array.isArray(o1) ? o1 : o2)
            );
        };
