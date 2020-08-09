import {List, Mapping, Predicate} from './type';
import {isArray, isString} from './predicate';

export function split(pattern: any) {

    return (content: string) => content.split(pattern);
}


export function join(pattern: any) {

    return <A>(content: Array<A>): string => content.join(pattern);
}


export function toLowerCase(s: string) {

    return s.toLowerCase();
}


export function toUpperCase(s: string) {

    return s.toUpperCase();
}


export function append(...s2: Array<string>) {

    return (s1: string): string => {

        return s1.concat(s2.join(''))
    }
}


export function prepend(...s2: Array<string>) {

    return (s1: string): string => {

        return s2.join('').concat(s1)
    }
}


export function take(n: number): <A>(_: string) => string
export function take<A>(n: number, s: string): string
export function take<A>(n: number, list?: string|Array<A>): any {

    function inner(as: Array<A>): Array<A>;
    function inner(as: string): string;
    function inner(as: Array<A>|string): Array<A>|string {

        if (isString(as)) {

            const as_ = as as string
            return n < 0
                ? ''
                : as_.slice(0, n) as string

        } else {

            throw 'illegal argument - must be array or string';
        }
    }

    return list === undefined
        ? inner as any
        : inner(list as any) as any
}


export function drop(n: number): <A>(as: string) => string
export function drop<A>(n: number, as: string): string
export function drop(n: number, as?: any): any {

    const inner = <A>(as: any) => {

        if (isString(as)) {

            const as_ = as as string
            return as_.slice(n) as string

        } else {

            throw 'illegal argument - must be array or string'
        }
    }

    return as === undefined
        ? inner
        : inner(as)
}


export function dropRight(n: number): <A>(as: string) => string
export function dropRight(n: number, as: string): string
export function dropRight(n: number, as?: any): any {

    const inner = <A>(as: any): any => {

        if (isString(as)) {

            return ((as as string).split(''))
                .slice(0, Math.max(0, as.length-n)).join('') as string

        } else {

            throw 'illegal argument - must be string'
        }
    }

    return as === undefined
        ? inner
        : inner(as)
}


export function takeRight(n: number) {

    function inner(as: string): string {

        if (isString(as)) {

            return n < 0 ? '' :
                ((as as string).split('')).reduceRight((acc: Array<string>, val, i) =>
                        (as.length - i) <= n ? [val].concat(acc) : acc
                    , []).join('')

        } else {

            throw 'illegal argument - must be string'
        }
    }

    return inner
}


export function dropRightWhile<A>(predicate: Predicate<A>): Mapping<string>
export function dropRightWhile<A>(predicate: Predicate<A>, as: string): string
export function dropRightWhile<A>(predicate: Predicate<A>, as?: any): any {

    const inner = (as: any): any => {

        const as1 = isString(as) ? (as as any).split('') : as

        let go = false
        const result = as1.reduceRight((acc: Array<A>, a: any) =>
            go || !predicate(a) ? (go = true, [a].concat(acc)) : acc, [])

        return isString(as) ? result.join('') : result
    }

    return as === undefined
        ? inner
        : inner(as)
}


export function dropWhile<A>(predicate: Predicate<A>): Mapping<string>
export function dropWhile<A>(predicate: Predicate<A>, as: string): string
export function dropWhile<A>(predicate: Predicate<A>, as?: any): any {

    const inner = (as: string) => {

        const as1 = isString(as) ? (as as any).split('') : as

        let go = false
        const result = as1.reduce((acc: Array<A>, a: any) =>
            go || !predicate(a) ? (go = true, acc.concat([a])) : acc, [])

        return isString(as)
            ? result.join('')
            : result
    }

    return as === undefined
        ? inner
        : inner(as)
}


export function takeRightWhile<A>(predicate: Predicate<A>): Mapping<string>
export function takeRightWhile<A>(predicate: Predicate<A>) {

    return (as: string) => {

        const as1 = isString(as) ? (as as any).split('') : as

        let go = true;
        const result = as1.reduceRight((acc: Array<A>, a: any) =>
            go && predicate(a) ? [a].concat(acc) : (go = false, acc), [])

        return isString(as) ? result.join('') : result
    };
}



export function takeWhile<A>(predicate: Predicate<string>): Mapping<List<string>>
export function takeWhile<A>(predicate: Predicate<A>, list: string): string
export function takeWhile<A>(predicate: Predicate<A>|Predicate<string>, list?: any): any {

    const inner = (list: any) => {

        const as1 = isString(list) ? (list as any).split('') : list

        let go = true;
        const result = as1.reduce((acc: Array<A>, a: any) =>
            go && predicate(a) ? acc.concat([a]) : (go = false, acc), [])

        return isString(list) ? result.join('') : result
    };

    return list === undefined
        ? inner
        : inner(list)
}
