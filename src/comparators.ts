import {getElForPathIn} from "./objects/core";
import {isNot, Predicate} from './predicates';
import {equals, subtract, union} from './arrays/set_like';
import {isEmpty} from './coll';


/**
 * @author Daniel de Oliveira
 */


// TODO add and comparator to to things like this
// .filter(_ => _ !== 'hasPeriod' && _!== 'hasPeriodEnd');
// .filter(and(isNot('hasPeriod'), isNot('hasPeriodEnd'))


export type Comparator = <A>(_: A) => Predicate<A>;


export const sameAs: Comparator = <A>(l:A) =>
    (r:A) => l === r;


export const equalTo: Comparator = <A>(l:A) =>
    (r:A) => sameAs(JSON.stringify(l))(JSON.stringify(r));


/**
 * Compares 2 arrays where elements order does not matter
 */
export const arrayEquivalent: Comparator = <A>(as1: Array<A>) =>
    (as2: Array<A>) =>
        isEmpty(subtract(as1)(as2)) && isEmpty(subtract(as2)(as1));


/**
 *
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
export const onBy = (compare: Function = sameAs) => (path: string) =>
    (l: any) => (r: any) =>
        path.length === 0
            ? undefined
            : compare(
                path.charAt(path.length - 1) === ':'
                ? l : getElForPathIn(l, path))
            (getElForPathIn(r, path.charAt(path.length - 1) === ':' ? path.slice(0, -1) : path));


export const on = onBy();


export const includedInBy = (compare: Comparator = sameAs) => <A>(as: Array<A>, ) =>
    (a: A): boolean => includesBy(compare)(as, a).length > 0;


export const includedIn =  includedInBy();


export const differentFromBy = (compare: Comparator = sameAs) => <A>(a:A) =>
    isNot(compare(a)); // TODO unit test compare


export const differentFrom = differentFromBy();


const includesBy =
    (compare: Comparator = sameAs) =>
        <A>(as: Array<A>, a: A) => // TODO make curried, add includes function, export
            as.filter(compare(a));



export const sameOn = <T>(path: string, l: T, r: T) =>
     on(path)(l)(r);


// TODO write tests
/**
 * Compares any two values of different types
 *
 * @author Thomas Kleinke
 */
export const equivalent: Comparator = (value1: any) => (value2: any) => {

    if (!value1 && !value2) return true;
    if ((value1 && !value2) || (!value1 && value2)) return false;

    const type1: string = getType(value1);
    const type2: string = getType(value2);

    if (type1 !== type2) {
        return false;
    } else if (type1 === 'object') {
        return equalTo(value1)(value2);
    } else if (type1 === 'array') {
        return equals(value1, value2, equalTo);
    } else {
        return compareFields(value1, value2);
    }
};


/**
 * @author Thomas Kleinke
 */
function compareFields(field1: any, field2: any): boolean {

    if (field1 instanceof Array && !(field2 instanceof Array)) return false;
    if (!(field1 instanceof Array) && field2 instanceof Array) return false;

    if (field1 instanceof Array) return equals(field1, field2, equalTo);

    return field1 === field2;
}


/**
 * @author Thomas Kleinke
 */
function getType(value: any): string {

    return typeof value == 'object'
        ? value instanceof Array
            ? 'array'
            : 'object'
        : 'flat';
}