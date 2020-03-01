

// ------------ @author Daniel de Oliveira -----------------

import {ArraySet, Comparator, ComparatorProducer, Predicate} from './type';

export const tripleEqual: any = <A>(l:A) =>
    (r:A) => l === r;


import {isArray, isNot, isObject} from './predicate';
import {subtractBy} from './set';
import {getElForPathIn} from './struct';


export const is = tripleEqual;


export const isnt = <A>(l: A) => isNot(tripleEqual(l));


/* internal */ export const greaterThan: any = <A>(l:A) =>
    (r: A) => l < r;


/* internal */ export const lessThan: any = <A>(l:A) =>
    (r: A) => l > r;


export const jsonEqual: any = <A>(l:A) =>
    (r:A) => tripleEqual(JSON.stringify(l))(JSON.stringify(r));


export const differentFromBy: ComparatorProducer = (compare: Comparator) => <A>(a:A) =>
    isNot(compare(a));


export const includedInBy = (compare: Comparator) => <A>(as: Array<A>) =>
    (a: A): boolean => {

        if (!isArray(as)) throw new TypeError('includedInBy: expected an Array');

        return includesBy(compare)(as, a).length > 0;
    };


export const subsetOfBy = (compare: Comparator) => <A>(superset: Array<A>) =>
    (subset: Array<A>): boolean => {

        if (!isArray(subset) || !isArray(superset))
            throw new TypeError('containedInBy: expected Arrays');

        return subset
            .filter(includedInBy(compare)(superset))
            .length === subset.length;
    };


export const supersetOfBy = (compare: Comparator) => <A>(subset: ArraySet<A>) =>
    (superset: ArraySet<A>): boolean => subsetOfBy(compare)(superset)(subset);


const compare = (acomparator: Comparator, ocomparator: Comparator) => (l: any) =>
    (r: any): boolean => {

        // Array
        if (isArray(l) && isArray(r)) return acomparator(l)(r);

        // {} or Object
        if (isObject(l) && isObject(r)) {
            if (!samesetBy(undefined as any)(Object.keys(l))(Object.keys(r))) return false;
            return ocomparator(l)(r);
        }

        return l instanceof Object && r instanceof Object

            // for example Date, Map
            ? jsonEqual(l)(r)

            // numbers, strings
            : typeof l === typeof r && l === r;
    };


const c = (acomparator: Comparator, ocomparator: Comparator) => (l: any) =>
    (r: any): boolean => compare(acomparator, ocomparator)(l)(r);


export const arrayEqualBy = (objectComparator?: Comparator) =>
    <A>(as1: Array<A>) => (as2: Array<A>): boolean => {

        const ocmp = objectComparator ? objectComparator : objectEqualBy(arrayEqualBy() as any);

        return as1.length !== as2.length
            ? false
            : as1
            .filter((a, i) => compare(equalBy(arrayEqualBy() as any) as any, ocmp)(a)(as2[i]))
            .length === as2.length;
    };


// Compares 2 arrays where elements order does not matter
export const samesetBy: (_: Comparator) => any =
    (objectComparator?: Comparator) =>
        <A>(as1: Array<A>) =>
            (as2: Array<A>) => {

                const ocmp = objectComparator ? objectComparator : objectEqualBy(samesetBy(undefined as any));
                const acmp = objectComparator ? samesetBy(ocmp): samesetBy(undefined as any);

                return subtractBy(c(acmp, ocmp))(as1)(as2).length === 0
                    && subtractBy(c(acmp, ocmp))(as2)(as1).length === 0;
            };


export const objectEqualBy =
    (arrayComparator: Comparator) =>
        (o1: Object) =>
            (o2: Object): boolean => {

                if (!isObject(o1) || !isObject(o2))
                    throw new TypeError('types do not match objectEqualBy');

                if (!samesetBy(undefined as any)(Object.keys(o1))(Object.keys(o2))) return false;

                return Object
                    .keys(o1)
                    .filter(key => {

                        return compare(
                            arrayComparator,
                            objectEqualBy(arrayComparator))
                        ((o1 as any)[key])
                        ((o2 as any)[key]);
                    })
                    .length === Object.keys(o1).length;
            };


export const equalBy =
    (arrayComparator: Comparator) =>
        (o1: any) =>
            (o2: any): boolean => compare(arrayComparator,
                objectEqualBy(arrayComparator))(o1)(o2);


const onBy = (compare: Function) => (path: string) =>
    (l: any) => (r: any) =>
        path.length === 0
            ? undefined
            : compare(getElForPathIn(l, path))(getElForPathIn(r, path));


export const on = (path: string, compare: Function = tripleEqual) =>
    (l: any) =>
        typeof compare(l) === 'function'
            ? (r: any) => onBy(compare)(path)(l)(r)
            : compare(getElForPathIn(l, path));


const includesBy =
    (compare: Comparator = tripleEqual) =>
        <A>(as: Array<A>, a: A) =>
            as.filter(compare(a));


export const by = <A>(p: Predicate<A>) => p;


export const differentFrom = differentFromBy(tripleEqual);


export const includedIn =  includedInBy(tripleEqual);


export const subsetOf = subsetOfBy(tripleEqual);


export const supersetOf = supersetOfBy(tripleEqual);


export const arrayEqual = arrayEqualBy(undefined as any);


// Compares 2 arrays where elements order does not matter
export const sameset: Comparator = samesetBy(undefined as any);


export const objectEqual: Comparator = objectEqualBy(arrayEqual as any);


export const equal = equalBy(arrayEqual as any);


export const equalTo = equal;


