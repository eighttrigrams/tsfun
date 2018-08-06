import {getElForPathIn} from "./objects/core";
import {isNot, Predicate} from './predicates';
import {subtract, subtractBy, union} from './arrays/set_like';
import {isEmpty} from './coll';


/**
 * @author Daniel de Oliveira
 */


// TODO add and comparator to to things like this
// .filter(_ => _ !== 'hasPeriod' && _!== 'hasPeriodEnd');
// .filter(and(isNot('hasPeriod'), isNot('hasPeriodEnd'))


export type Comparator = <A>(_: A) => Predicate<A>;


export const tripleEqual: Comparator = <A>(l:A) =>
    (r:A) => l === r;


export const jsonEqual: Comparator = <A>(l:A) =>
    (r:A) => tripleEqual(JSON.stringify(l))(JSON.stringify(r));



/**
 * Compares 2 arrays where elements order does not matter
 */
export const arrayEquivalentBy: (_: Comparator) => Comparator =
    (comp: Comparator) =>
        <A>(as1: Array<A>) =>
            (as2: Array<A>) =>
                isEmpty(subtractBy(comp)(as1)(as2)) && isEmpty(subtractBy(comp)(as2)(as1));


/**
 * Compares 2 arrays where elements order does not matter
 */
export const arrayEquivalent: Comparator = arrayEquivalentBy(tripleEqual);


/**
 * TODO add recursive version
 * document the order issue as part of objects explanation in structs_colls.md
 */
export const objectEquivalent: Comparator = (o1: object) =>
    (o2: object) =>
        arrayEquivalent(Object.keys(o1))(Object.keys(o2))
            && Object
                .keys(o1)
                .filter((key: any) => (o1 as any)[key] === (o2 as any)[key])
                .length === Object.keys(o1).length;


export const smallerThan: Comparator = <A>(l:A) =>
    (r: A) => l > r;

export const biggerThan: Comparator = <A>(l:A) =>
    (r: A) => l < r;


// TODO take care for cases where undefined === undefined
export const onBy = (compare: Function = tripleEqual) => (path: string) =>
    (l: any) => (r: any) =>
        path.length === 0
            ? undefined
            : compare(
                path.charAt(path.length - 1) === ':'
                ? l : getElForPathIn(l, path))
            (getElForPathIn(r, path.charAt(path.length - 1) === ':' ? path.slice(0, -1) : path));


export const on = onBy();


export const includedInBy = (compare: Comparator) => <A>(as: Array<A>, ) =>
    (a: A): boolean => includesBy(compare)(as, a).length > 0;


export const includedIn =  includedInBy(tripleEqual);


export const differentFromBy = (compare: Comparator) => <A>(a:A) =>
    isNot(compare(a)); // TODO unit test compare


export const differentFrom = differentFromBy(tripleEqual);


const includesBy =
    (compare: Comparator = tripleEqual) =>
        <A>(as: Array<A>, a: A) => // TODO make curried, add includes function, export
            as.filter(compare(a));



export const sameOn = <T>(path: string, l: T, r: T) =>
     on(path)(l)(r);