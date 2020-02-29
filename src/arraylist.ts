import {ArrayList, Pair, Predicate} from './type';
import {isArray, isNot, isString} from './predicate';
import {copy, reduce} from './associative';


// ------------ @author Daniel de Oliveira -----------------

export function reverse<A>(as: string): string;
export function reverse<A>(as: ArrayList<A>): ArrayList<A>;
export function reverse<A>(as: ArrayList<A>|string): ArrayList<A>|string {

    if (isArray(as)) {

        return (as as Array<A>).reduce((acc: Array<A>, a) => [a].concat(acc), []);

    } if (isString(as)) {

        return (as as string).split('').reverse().join('');

    } else {

        throw 'illegal argument - must be array or string'
    }
}


export function append<A>(...as2: Array<A>): {
    (as: Array<A>): Array<A>;
    (as: string): string;
}
export function append<A>(...as2: Array<A>) {

    return (as: Array<A>|string) => {

        if (isArray(as) && isArray(as2)) {

            return as.concat(as2 as any) as Array<A>;

        } else if (isString(as)) {

            return as.concat((as2 as any).join('')) as string;
        }
    }
}



export function prepend<A>(...as2: Array<A>): {
    (as: Array<A>): Array<A>;
    (as: string): string;
}
export function prepend<A>(...as2: Array<A>) {

    return (as: Array<A>|string) => {

        if (isArray(as) && isArray(as2)) {

            return as2.concat(as as any) as Array<A>;

        } else if (isString(as)) {

            return (as2 as any).join('').concat(as) as string;
        }
    }
}


export const flatMap = <A, B>(f: (_: A) => ArrayList<B>) =>
    (as: Array<A>): Array<B> =>
        (as.length < 1
            ? []
            : as.reduce(intoArrayWith(f as any),[])) as unknown as Array<B>;


export function flatten<T>(as: Array<Array<T>>): Array<T>;
export function flatten<T,R>(depth: number): (as: Array<T>) => Array<R>;
export function flatten<T,R>(asOrDepth: Array<Array<T>>|number): Array<Array<T>>|((_:Array<T>) => Array<R>) {

    const reducer = reduce((acc: any, val: any) => acc.concat(val), [] as any); // TODO rename or review and check duplication with flatMap

    return isArray(asOrDepth)
        ? reducer(asOrDepth as Array<Array<T>>)
        : (as: Array<T>) =>
            asOrDepth === 1
                ? reducer(as)
                : flatten((asOrDepth as number) - 1)(reducer(as));
}


export const indices = <A>(f: Predicate<A>) =>
    (as: Array<A>): number[] =>
        as.reduce((indices: number[], a: A, i: number) =>
                f(a)
                    ? indices.concat([i])
                    : indices
        , []);


export const forEachRight = <A>(
    f: ((_: A, i: number) => void)|((_: A) => void)) =>
    (as: Array<A>) => {
        let i = as.length - 1;
        for (let item of reverse(as)) {
            (f as any)(item, i);
            i--;
        }
        return as;
    };


const intoArrayWith = <A>(f: (_: A) => Array<A>) =>
    (acc: Array<A>, val: A) => acc.concat(f(val));


export const dropRight = (n: number) =>
    <A>(as: ArrayList<A>): ArrayList<A> =>
        as.slice(0, Math.max(0, as.length-n)) as ArrayList<A>;


export const dropWhile = <A>(predicate: Predicate<A>) =>
    (as: ArrayList<A>) => {
        let go = false;
        return as.reduce((acc: Array<A>, a) =>
            go || !predicate(a) ? (go = true, acc.concat([a])) : acc, []);
    };


export const dropRightWhile = <A>(predicate: Predicate<A>) =>
    (as: ArrayList<A>) => {
        let go = false;
        return as.reduceRight((acc: Array<A>, a) =>
            go || !predicate(a) ? (go = true, [a].concat(acc)) : acc, []);
    };


export function take(n: number) {

    function inner<A>(as: ArrayList<A>): ArrayList<A>;
    function inner(as: string): string;
    function inner<A>(as: ArrayList<A>|string): ArrayList<A>|string {

        if (isArray(as)) {

            const as_ = as as ArrayList<A>;
            return n < 0 ? [] :
                as_.reduce((acc: ArrayList<A>, val, i) =>
                        i < n ? acc.concat([val]) : acc
                    , []) as ArrayList<A>;

        } else if (isString(as)) {

            const as_ = as as string;
            return n < 0
                ? ''
                : as_.slice(0, n) as string;

        } else {

            throw 'illegal argument - must be array or string';
        }
    }

    return inner;
}


export function drop(n: number) {

    function inner<A>(as: ArrayList<A>): ArrayList<A>;
    function inner(as: string): string;
    function inner<A>(as: ArrayList<A>|string): ArrayList<A>|string {

        if (isArray(as)) {

            const as_ = as as ArrayList<A>;
            return n < 1 ? as_ :
                    as.slice(n);

        } else if (isString(as)) {

            const as_ = as as string;
            return as_.slice(n) as string;

        } else {

            throw 'illegal argument - must be array or string';
        }
    }

    return inner;
}


export const takeRight = (n: number) =>
    <A>(as: ArrayList<A>) =>
        n < 0 ? [] :
            as.reduceRight((acc: ArrayList<A>, val, i) =>
                (as.length - i) <= n ? [val].concat(acc) : acc
                , []);


export const takeNth = (n: number) =>
    <A>(as: ArrayList<A>) =>
        n < 0 ? [] :
            as.reduce((acc: ArrayList<A>, val, i) =>
                    i % n === 0 ? acc.concat([val]) : acc
                , []);


export const takeWhile = <A>(predicate: Predicate<A>) =>
    (as: ArrayList<A>) => {
        let go = true;
        return as.reduce((acc: ArrayList<A>, a) =>
            go && predicate(a) ? acc.concat([a]) : (go = false, acc), []);
    };


export const takeRightWhile = <A>(predicate: Predicate<A>) =>
    (as: ArrayList<A>) => {
        let go = true;
        return as.reduceRight((acc: Array<A>, a) =>
            go && predicate(a) ? [a].concat(acc) : (go = false, acc), []);
    };


export const takeUntil = <A>(predicate: Predicate<A>) =>
    (as: ArrayList<A>) =>
        (found => found ?
                takeWhile(isNot(predicate))(as).concat([found])
                : as
        )(as.find(predicate));


export function zip<A,B> (as: ArrayList<A>) {

    return (bs: ArrayList<B>): ArrayList<Pair<A, B>> => {

        const minimumLength = Math.min(as.length, bs.length);
        const _as = take(minimumLength)(as);
        const _bs = take(minimumLength)(bs);

        const zipped: ArrayList<[A, B]> = [];
        for (let i = 0; i < minimumLength; i++) {
            zipped.push([_as[i] as A, _bs[i] as B]);
        }
        return zipped;
    }
}


export function zipWith<A,B,C> (f: (a: A, b: B) => C, as: ArrayList<A>) {

    return (bs: ArrayList<B>): ArrayList<C> => {

        const minimumLength = Math.min(as.length, bs.length);
        const _as = take(minimumLength)(as);
        const _bs = take(minimumLength)(bs);

        const zipped: ArrayList<C> = [];
        for (let i = 0; i < minimumLength; i++) {
            zipped.push(f((_as as any)[i] as A, (_bs as any)[i] as B));
        }
        return zipped;
    }
}


/**
 * see https://mail.mozilla.org/pipermail/es-discuss/2012-April/022273.html
 */
function arrayList(size: number) {

    return Array.apply(null, Array(size))
}


export function range(a: number, b?: number, stepSize: number = 1): number[] {

    let begin: number|undefined = undefined;
    let end:   number|undefined = undefined;

    if (b === undefined) {
        end = a;
        begin = 0;
    } else {
        begin = a;
        end   = b;
    }
    const numItems = (end - begin) / stepSize;

    return arrayList(numItems)
        .map((a: any, i: number) => (begin as number) + (i * stepSize));
}


export function sort<A>(f: (a: A, b: A) => number) {

    return (as: Array<A>): Array<A> => copy(as).sort(f as any);
}


export function first<T>(as: string): string|undefined;
export function first<T>(as: Array<T>): T|undefined;
export function first<T>(as: Array<T>|string): string|T|undefined {

    return as.length === 0
        ? undefined
        : as[0];
}


export function last<T>(as: string): string|undefined;
export function last<T>(as: Array<T>): T|undefined;
export function last<T>(as: Array<T>|string): string|T|undefined {

    return as.length === 0
        ? undefined
        : as[as.length-1];
}
