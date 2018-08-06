import {getElForPathIn} from "./objects/core";
import {isNot, Predicate} from './predicates';


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