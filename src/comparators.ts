import {getElForPathIn} from "./objects";
import {isArray, isNot, isObject, isUndefined} from './predicates';
import {Comparator, ComparatorProducer} from './types';



export const tripleEqual: Comparator = <A>(l:A) =>
    (r:A) => l === r;


export const jsonEqual: Comparator = <A>(l:A) =>
    (r:A) => tripleEqual(JSON.stringify(l))(JSON.stringify(r));


export const biggerThan: Comparator = <A>(l:A) =>
    (r: A) => l < r;


export const smallerThan: Comparator = <A>(l:A) =>
    (r: A) => l > r;


export const differentFromBy: ComparatorProducer = (compare: Comparator) => <A>(a:A) =>
    isNot(compare(a));


export const differentFrom = differentFromBy(tripleEqual);


export const includedInBy = (compare: Comparator) => <A>(as: Array<A>) =>
    (a: A): boolean => {

        if (!isArray(as)) throw new TypeError('includedInBy: expected an Array');

        return includesBy(compare)(as, a).length > 0;
    };


export const includedIn =  includedInBy(tripleEqual);


export const containedInBy = (compare: Comparator) => <A>(superset: Array<A>) =>
    (subset: Array<A>): boolean => {

        if (!isArray(subset) || !isArray(superset))
            throw new TypeError('containedInBy: expected Arrays');

        if (subset.length > superset.length) return false;

        return subset
            .filter(includedInBy(compare)(superset))
            .length === subset.length;
    };


export const containedIn = containedInBy(tripleEqual);


const compare = (acomparator: Comparator, ocomparator: Comparator, l: any) =>
    (r: any): boolean => {

    // Array
    if (isArray(l) && isArray(r)) {
        if (l.length !== r.length) return false;
        return acomparator(l)(r);
    }

    // {} or Object
    if (isObject(l) && isObject(r)) {
        if (!arrayEquivalent(Object.keys(l))(Object.keys(r))) return false;
        return ocomparator(l)(r);
    }

    return l instanceof Object && r instanceof Object

        // for example Date, Map
        ? jsonEqual(l)(r)

        // numbers, strings
        : typeof l === typeof r && l === r;
};


export const arrayEqualBy = (objectComparator?: Comparator) =>
    <A>(as1: Array<A>) => (as2: Array<A>): boolean => {

        const ocmp = objectComparator ? objectComparator : objectEqual;

        return as1
            .filter((a, i) => compare(arrayEqual, ocmp, a)(as2[i]))
            .length === as2.length;
    };


export const arrayEqual = arrayEqualBy();


// Compares 2 arrays where elements order does not matter
export const arrayEquivalentBy: (_: Comparator) => Comparator =
    (objectComparator?: Comparator) =>
        <A>(as1: Array<A>) =>
            (as2: Array<A>) => {

                if (as1.length !== as2.length) return false;

                const ocmp = objectComparator ? objectComparator : objectEqualBy(arrayEquivalent);
                const acmp = objectComparator ? arrayEquivalentBy(ocmp): arrayEquivalent;
                return as1
                    .map(a1 =>
                        as2.find(compare(acmp, ocmp, a1)))
                    .filter(isUndefined)
                    .length === 0;
            };


// Compares 2 arrays where elements order does not matter
export const arrayEquivalent: Comparator = arrayEquivalentBy(undefined as any);


export const objectEqualBy =
    (arrayComparator: Comparator) =>
        (o1: Object) =>
            (o2: Object): boolean => {

                if (!isObject(o1) || !isObject(o2))
                    throw new TypeError('types do not match objectEqualBy');

                if (!arrayEquivalent(Object.keys(o1))(Object.keys(o2))) return false;

                return Object
                    .keys(o1)
                    .filter(key => {

                        return compare(
                            arrayComparator,
                            objectEqualBy(arrayComparator),
                            ((o1 as any)[key]))
                            ((o2 as any)[key]);
                    })
                    .length === Object.keys(o1).length;
            };


export const objectEqual: Comparator = objectEqualBy(arrayEqual);


export const equalBy =
    (arrayComparator: Comparator) =>
        (o1: any) =>
            (o2: any): boolean => compare(arrayComparator,
                objectEqualBy(arrayComparator), o1)(o2);


export const equal = equalBy(arrayEqual);


export const equivalent = equalBy(arrayEquivalent);


export const onBy = (compare: Function) => (path: string) =>
    (l: any) => (r: any) =>
        path.length === 0
            ? undefined
            : compare(
                path.charAt(path.length - 1) === ':'
                ? l : getElForPathIn(l, path))
            (getElForPathIn(r, path.charAt(path.length - 1) === ':' ? path.slice(0, -1) : path));


export const on = (path: string) =>
    (l: any|Function) => (r: any) => typeof l === 'function'
        ? l(getElForPathIn(r, path))
        : onBy(tripleEqual)(path)(l)(r);


const includesBy =
    (compare: Comparator = tripleEqual) =>
        <A>(as: Array<A>, a: A) =>
            as.filter(compare(a));



export const sameOn = <T>(path: string, l: T, r: T) =>
     on(path)(l)(r);