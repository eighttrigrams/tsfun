

// ------------ @author Daniel de Oliveira -----------------

import {ArraySet, Comparator, ComparatorProducer, Pair, Predicate} from './type';

export function tripleEqual<A>(l:A) {

    return (r: A) => l === r;
}


import {isArray, isNot, isObject, isString} from './predicate';
import {subtractBy} from './set';
import {getElForPathIn} from './struct';
import {flow} from './composition';
import {remove, size} from './collection';
import {reverse, zip} from './list';



export function greaterThan(than: number): (that: number) => boolean;
export function greaterThan(than: string): (that: string) => boolean;
export function greaterThan(than: number|string) {

    return (that: number|string) => {

        if (isString(than) && (than as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1';
        }
        if (isString(that) && (that as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1';
        }
        if ((isString(that) && !isString(than)) || (isString(than) && !isString(that))) {
            throw 'illegal argument - either both arguments must be number or both arguments must be string'
        }

        return that > than;
    }
}


export function lessThan(than: number): (that: number) => boolean;
export function lessThan(than: string): (that: string) => boolean;
export function lessThan(than: number|string) {

    return (that: number|string) => {

        if (isString(than) && (than as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1';
        }
        if (isString(that) && (that as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1';
        }
        if ((isString(that) && !isString(than)) || (isString(than) && !isString(that))) {
            throw 'illegal argument - either both arguments must be number or both arguments must be string'
        }

        return that < than;
    }
}


export function greaterOrEqualThan(than: number): (that: number) => boolean;
export function greaterOrEqualThan(than: string): (that: string) => boolean;
export function greaterOrEqualThan(than: number|string) {

    return (that: number|string) => {

        if (isString(than) && (than as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1';
        }
        if (isString(that) && (that as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1';
        }
        if ((isString(that) && !isString(than)) || (isString(than) && !isString(that))) {
            throw 'illegal argument - either both arguments must be number or both arguments must be string'
        }

        return that >= than;
    }
}


export function lessOrEqualThan(than: number): (that: number) => boolean;
export function lessOrEqualThan(than: string): (that: string) => boolean;
export function lessOrEqualThan(than: number|string) {

    return (that: number|string) => {

        if (isString(than) && (than as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1';
        }
        if (isString(that) && (that as string).length !== 1) {
            throw 'illegal argument - string argument must be of length 1';
        }
        if ((isString(that) && !isString(than)) || (isString(than) && !isString(that))) {
            throw 'illegal argument - either both arguments must be number or both arguments must be string'
        }

        return that <= than;
    }
}


export function is<A>(a: A) {

    return tripleEqual(a);
}


export const isnt = <A>(l: A) => isNot(tripleEqual(l));


export const jsonEqual: any = <A>(l:A) =>
    (r:A) => tripleEqual(JSON.stringify(l))(JSON.stringify(r));


export const differentFromBy: ComparatorProducer = (compare: Comparator) => <A>(a:A) =>
    isNot(compare(a));


export const includedInBy = (compare: Comparator) => <A>(as: Array<A>) =>
    (a: A): boolean => {

        if (!isArray(as)) throw 'illegal argument - includedInBy: expected an Array';

        return includesBy(compare)(as, a).length > 0;
    };


export const subsetOfBy = (compare: Comparator) => <A>(superset: Array<A>) =>
    (subset: Array<A>): boolean => {

        if (!isArray(subset) || !isArray(superset))
            throw 'illegal argument - containedInBy: expected Arrays';

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
    (compare: Comparator = tripleEqual as any) =>
        <A>(as: Array<A>, a: A) =>
            as.filter(compare(a));


export const by = <A>(p: Predicate<A>) => p;


export function differentFrom(that: any) {

    return differentFromBy(tripleEqual as any)(that);
}


export function includedIn(as: string): (a: string) => boolean;
export function includedIn<A>(as: Array<A>): (a: A) => boolean;
export function includedIn<A>(as: Array<A>|string) {

    return (a: A) => {

        if (isString(as) && isString(a) && (a as any).length === 1) {

            return includedInBy(tripleEqual as any)((as as any).split(''))(a);

        } else if (isArray(as)) {

            return includedInBy(tripleEqual as any)(as as any)(a);

        } else {

            throw 'illegal argument in includedIn'
        }
    }
}


export function subsetOf<A>(that: Array<A>) {

    return subsetOfBy(tripleEqual as any)(that);
}


export function supersetOf<A>(that: Array<A>) {

    return supersetOfBy(tripleEqual as any)(that);
}


export function arrayEqual<A>(that: Array<A>) {

    return arrayEqualBy(undefined as any)(that);
}


// Compares 2 arrays where elements order does not matter
export function sameset<A>(as: Array<A>) {

    return samesetBy(undefined as any)(as);
}


export const objectEqual: Comparator = objectEqualBy(arrayEqual as any);


export const equal = equalBy(arrayEqual as any);


export const equalTo = equal;


export function startsWith<A>(s: string): (as: string) => boolean;
export function startsWith<A>(s: Array<A>): (as: Array<A>) => boolean;
export function startsWith<A>(that: string|Array<A>) {

    return (what: string|Array<A>) => {

        if (isString(what) && isString(that)) {

            return (what as any).startsWith(that);

        } else if (isArray(what) && isArray(that)) {

            return that.length > what.length
                ? false
                : flow(
                    what as Array<A>,
                    zip(that as Array<A>),
                    remove(pairIsSame),
                    size,
                    is(0));

        } else {

            throw 'illegal argument - args must be either both strings or both arrays';
        }
    }
}


const pairIsSame = <A>([a, b]: Pair<A, A>) => a === b;


export function endsWith<A>(s: string): (as: string) => boolean;
export function endsWith<A>(s: Array<A>): (as: Array<A>) => boolean;
export function endsWith<A>(that: string|Array<A>) {

    return (what: string|Array<A>) => {

        if (isString(what) && isString(that)) {

            return (what as any).endsWith(that);

        } else if (isArray(what) && isArray(that)) {

            return that.length > what.length
                ? false
                : flow(
                    (what as Array<A>),
                    reverse,
                    zip(reverse(that as Array<A>)),
                    remove(pairIsSame),
                    size,
                    is(0));

        } else {

            throw 'illegal argument - args must be either both strings or both arrays';
        }
    }
}



