import {getElForPathIn} from "./objects/core";
import {isNot, Predicate} from './predicates';
import {subtractBy} from './arrays/set_like';
import {isEmpty} from './coll';


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
    isNot(compare(a)); // TODO unit test compare


export const differentFrom = differentFromBy(tripleEqual);


export const includedInBy = (compare: Comparator) => <A>(as: Array<A>, ) =>
    (a: A): boolean => includesBy(compare)(as, a).length > 0;


export const includedIn =  includedInBy(tripleEqual);


// TODO make that it makes a distinction on every element if it is a primitive
// or the comparator should be used.
export const arrayEqualBy = (compare: Comparator) =>
    <A>(as1: Array<A>) => (as2: Array<A>) =>
        as1
            .filter((a, i) => compare(a)(as2[i]))
            .length === as2.length;


export const arrayEqual = arrayEqualBy(tripleEqual);


/**
 * Compares 2 arrays where elements order does not matter
 */
export const arrayEquivalentBy: (_: Comparator) => Comparator =
    (comp: Comparator) =>
        <A>(as1: Array<A>) =>
            (as2: Array<A>) =>
                isEmpty(subtractBy(comp)(as1)(as2)) && isEmpty(subtractBy(comp)(as2)(as1));


// TODO maybe arrayContaining (see jasmine) as a more general solution would
// be better. arrayContaining on same sized arrays is equivalent to arrayEquivalent

/**
 * Compares 2 arrays where elements order does not matter
 */
export const arrayEquivalent: Comparator = arrayEquivalentBy(tripleEqual);


export const objectEquivalentBy =
    (arrayComparator: Comparator) =>
        (o1: Object) => // TODO test if both have Object constructor, then the later constructor check also will not be necessary
            (o2: Object): boolean =>
                arrayEquivalent(Object.keys(o1))(Object.keys(o2))
                && Object
                    .keys(o1)
                    .filter((key: any) => {
                        const v1 = (o1 as any)[key];
                        const v2 = (o2 as any)[key];

                        if (v1 instanceof Array && v2 instanceof Array)
                            return arrayComparator(v1)(v2);


                        return v1 instanceof Object && v2 instanceof Object

                            ? v1.constructor === Object && v2.constructor === Object

                                // {} or Object
                                ? objectEquivalentBy(v1)(v2)

                                // for example Date, Map
                                : jsonEqual(v1)(v2)

                            // numbers, strings
                            : typeof v1 === typeof v2 && v1 === v2;
                    })
                    .length === Object.keys(o1).length;


/**
 * TODO document the order issue as part of objects explanation in structs_colls.md
 */
export const objectEquivalent: Comparator = objectEquivalentBy(arrayEqual);


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