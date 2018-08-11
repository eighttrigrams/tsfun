import {getElForPathIn} from "./objects/core";
import {isNot, isUndefined, Predicate} from './predicates';


export type Comparator = <A>(_: A) => Predicate<A>;


export const tripleEqual: Comparator = <A>(l:A) =>
    (r:A) => l === r;


export const jsonEqual: Comparator = <A>(l:A) =>
    (r:A) => tripleEqual(JSON.stringify(l))(JSON.stringify(r));


export const biggerThan: Comparator = <A>(l:A) =>
    (r: A) => l < r;


export const smallerThan: Comparator = <A>(l:A) =>
    (r: A) => l > r;


export const differentFromBy = (compare: Comparator) => <A>(a:A) =>
    isNot(compare(a)); // TODO unit test


export const differentFrom = differentFromBy(tripleEqual);


export const includedInBy = (compare: Comparator) => <A>(as: Array<A>, ) =>
    (a: A): boolean => includesBy(compare)(as, a).length > 0;


export const includedIn =  includedInBy(tripleEqual);


function compare(acomparator: Comparator, ocomparator: Comparator, l: any, r: any): boolean {

    if (l instanceof Array && l instanceof Array)
        return acomparator(l)(r);


    return l instanceof Object && r instanceof Object

        ? l.constructor === Object && r.constructor === Object

            // {} or Object
            ? ocomparator(l)(r)

            // for example Date, Map
            : jsonEqual(l)(r)

        // numbers, strings
        : typeof l === typeof r && l === r;
}

// TODO consider cases where a certain subpath (use 'on'?) is to
// be compared with a certain comparator, while others are compared
// with defaults or like configured

// TODO consider cases where Arrays are nested within Arrays,
// in these cases the same selected comparator is used.

export const arrayEqualBy = (objectComparator?: Comparator) =>
    <A>(as1: Array<A>) => (as2: Array<A>): boolean => {

        const ocmp = objectComparator ? objectComparator : objectEqual;

        return as1
            // TODO Test Array, Date
            .filter((a, i) => compare(arrayEqual, ocmp, a, as2[i]))
            .length === as2.length;
    };


export const arrayEqual = arrayEqualBy();


/**
 * Compares 2 arrays where elements order does not matter
 */
export const arrayEquivalentBy: (_: Comparator) => Comparator =
    (comp?: Comparator) =>
        <A>(as1: Array<A>) =>
            (as2: Array<A>) => {

                const ocmp = comp ? comp : objectEqualBy(arrayEquivalent);
                const acmp = comp ? arrayEquivalentBy(ocmp): arrayEquivalent;

                return as1.length === as2.length                                    // TODO add arrayContaining and implement it with as1.length == as2.length && arrayContainingBy()()()
                && as1
                    .map(a1 =>                                            // TODO look up fpscala book for this nesting thing here / for comprehension and yield
                        as2.find(a2 => compare(acmp, ocmp, a1, a2)))
                    .filter(isUndefined)
                    .length === 0;
            };


                                                                                    // TODO maybe arrayContaining (see jasmine) as a more general solution would
                                                                                    // be better. arrayContaining on same sized arrays is equivalent to arrayEquivalent

/**
 * Compares 2 arrays where elements order does not matter
 */
export const arrayEquivalent: Comparator = arrayEquivalentBy(undefined as any);


export const objectEqualBy =
    (arrayComparator: Comparator /*, objectComparator */) =>
        (o1: Object) =>
            (o2: Object): boolean => {

                if (o1.constructor !== Object || o2.constructor !== Object) throw 'e'; // TODO throw TypeError and test it
                if (!arrayEquivalent(Object.keys(o1))(Object.keys(o2))) return false;

                return Object
                    .keys(o1)
                    .filter((key: any) => {

                        return compare(
                            arrayComparator,
                            objectEqualBy(arrayComparator),
                            (o1 as any)[key],
                            (o2 as any)[key]);
                    })
                    .length === Object.keys(o1).length;
            };


export const objectEqual: Comparator = objectEqualBy(arrayEqual);


// TODO take care for cases where undefined === undefined
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
        <A>(as: Array<A>, a: A) => // TODO make curried, add includes function, export
            as.filter(compare(a));



export const sameOn = <T>(path: string, l: T, r: T) =>
     on(path)(l)(r);