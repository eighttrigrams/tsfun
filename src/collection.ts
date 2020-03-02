import {ObjectCollection, ObjectMap, Pair, Predicate} from './type';
import {isArray, isDefined, isObject, isString} from './predicate';
import {keys, reduce} from './associative';


export function copy<T>(struct: Array<T>): Array<T>;
export function copy<T>(struct: ObjectMap<T>): ObjectMap<T>;
export function copy(struct: string): string;
export function copy<T>(struct: Array<T>|ObjectMap<T>|string) {

    return isString(struct)
        ? (struct as any).slice()
        : isArray(struct)
            ? [...struct]
            : {...struct as any};
}


export function count<A>(p: Predicate<A>): {
    (as: Array<A>): number
    (os: ObjectCollection<A>): number
    (s: string): number
}
export function count<A>(p: Predicate<A>) {

    return (as: Array<A>|ObjectCollection<A>|string): number => {

        return size(filter(p)(as as any));
    }
}


export function prune(o: string): string;
export function prune<T>(o: ObjectCollection<T>): ObjectCollection<T>;
export function prune<A>(as: Array<A>): Array<A>;
export function prune<T>(ts: Array<T>|ObjectCollection<T>|string) {

    return !isString(ts)
        ? filter(isDefined)(ts as any)
        : (ts as string).replace(' ', '') as any;
}


export function filter<A>(p: (a: A, i?: number|string) => boolean): {
    (as: Array<A>): Array<A>
    (os: ObjectCollection<A>): ObjectCollection<A>
    (s: string): string;
}
export function filter<A>(p: (a: A, i?: number|string) => boolean) {

    return (as: Array<A>|ObjectCollection<A>) => {

        if (isArray(as)) {

            const as1 = [];
            let i = 0;
            for (let a of as) {
                if (p(a, i)) as1.push(a);
                i++;
            }

            return as1 as Array<A>
        }
        else if (isObject(as)) {

            const o = as as ObjectCollection<A>;

            const o1: any = {};
            let i = 0;
            for (let k of keys(o)) {
                if (p(o[k], k)) o1[k] = o[k];
                i++;
            }

            return o1 as ObjectCollection<A>;

        } else if (isString(as)) {

            const s = (as as any).split('');

            const o1: any = [];
            let i = 0;
            for (let k of keys(s)) {
                if (p(s[k], k)) o1[k] = s[k];
                i++;
            }

            return o1.join('') as string;

        } else {

            throw 'illegal argument - must be array or object';
        }
    }
}


export function indices(p: Predicate<string>): {
    (as: string): number[]
}
export function indices<A>(p: Predicate<A>): {
    (as: Array<A>): number[]
    (as: ObjectCollection<A>): string[]
}
export function indices<A>(p: Predicate<A>) {

    function inner(as: Array<A>|string): number[];
    function inner(as: ObjectCollection<A>): string[];
    function inner(as: Array<A>|string|ObjectCollection<A>): number[]|string[] {

        return reduce(
            (indices: number[], a: A, i: number|string) => p(a)
                ? indices.concat([i] as any)
                : indices
            , [])(isString(as) ? (as as any).split('') : as);
    }

    return inner;
}


export function size(as: string): number;
export function size<A>(as: Array<A>): number;
export function size<T>(o: ObjectCollection<T>): number;
export function size<T>(o: string|Array<T>|ObjectCollection<T>): number {

    return (isArray(o) || isString(o)
        ? o.length
        : keys(o as any).length) as number;
}



export function remove<A>(p: (a: A, i?: number|string) => boolean): {
    (as: Array<A>): Array<A>
    (os: ObjectCollection<A>): ObjectCollection<A>
    (s: string): string
}
export function remove<A>(p: (a: A, i?: number|string) => boolean) {

    return filter((a: any, i: number|string) => !p(a, i));
}


export function separate<A>(p: (a: A, i?: number|string) => boolean): {
    (as: Array<A>): Pair<Array<A>,Array<A>>
    (os: ObjectCollection<A>): Pair<ObjectCollection<A>,ObjectCollection<A>>
    (s: string): Pair<string, string>
}
export function separate<A>(p: (a: A, i?: number|string) => boolean) {

    return (as: Array<A>|ObjectCollection<A>): Pair<Array<A>, Array<A>>|Pair<ObjectCollection<A>,ObjectCollection<A>> =>
        [filter(p)(as as any), remove(p)(as as any)];
}