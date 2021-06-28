import {uncurry2} from './core'
import {Comparator} from './type'
import {isEmpty, isFunction, isNot, isString} from './predicate'
import {includedIn, is} from './comparator'
import {$reduce0} from './array'

// ------------ @author Daniel de Oliveira -----------------


/**
 * tsfun | duplicates
 *
 * Initially added by Thomas Kleinke
 *
 * ```
 * duplicates([3, 3, 1, 4, 3, 1])
 * >> [3, 1]
 * ```
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/set/duplicates.spec.ts
 */
export function duplicates<A>(as: Array<A>): Array<A>
export function duplicates<A>(comparator: Comparator<A>, as: Array<A>): Array<A>
export function duplicates<A>(comparator: Comparator<A>): (as: Array<A>) => Array<A>
export function duplicates(...args): any {

    const $ = comparator => as => {

        const temp: any[] = []
        const result: any[] = []

        for (let value of as) {

            if (includedIn(comparator, temp, value) && !includedIn(comparator, result, value)) {
                result.push(value)
            } else {
                temp.push(value)
            }
        }

        return result
    }

    return args.length === 1
        ? isFunction(args[0])
            ? $(args[0])
            : $(is)(args[0])
        : $(args[0])(args[1])
}


/**
 * tsfun | intersection
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/set/intersection.spec.ts
 */
export function intersection(aas: Array<string>): Array<string>;
export function intersection<A>(aas: Array<Array<A>>): Array<A>;
export function intersection<A>(comparator: Comparator, aas: Array<Array<A>>): Array<A>;
export function intersection<A>(comparator: Comparator): (aas: Array<Array<A>>) => Array<A>;
export function intersection(a, b?): any {

    const $ =
        (compare?: Comparator) =>
            <A>(aas: Array<Array<A>>): Array<A> => {

                const $ = (compare: Comparator) => <A>(as1: Array<A>) =>
                    (as2: Array<A>) => as1.filter(compare === undefined ? includedIn(as2) : includedIn(compare)(as2))

                if (aas.length < 1) return []
                if (aas.length === 1) return aas[0]

                if (compare) return aas.reduce(uncurry2<A>($(compare)))

                for (let i = 0; i < aas.length - 1; i++) {
                    // see https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript, answer of le_m
                    aas[i+1] = aas[i].filter(Set.prototype.has, new Set(aas[i + 1]))
                }
                return set(aas[aas.length - 1])
            }

    if (isFunction(a) && b === undefined) return aas => $(a)(aas)

    const comp =
        isFunction(a)
            ? a
            : undefined;

    const aas =
        isFunction(a)
            ? b
            : a;

    if (isEmpty(aas)) return []
    return $(comp)(aas as any)
}


/**
 * tsfun | intersect
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/set/intersect.spec.ts
 */
export function intersect<A>(set1: Array<A>): (set2: Array<A>) => Array<A>
export function intersect<A>(comp: Comparator, set1: Array<A>): (set2: Array<A>) => Array<A>
export function intersect<A>(...sets: Array<Array<A>>): Array<A>
export function intersect(...args): any {

    const $ =
        (compare?: Comparator) =>
            <A>(as1: Array<A>) =>
                (as2: Array<A>): Array<A> =>
                    compare !== undefined
                        ? intersection(compare)([as1, as2])
                        : intersection([as1, as2]) as any

    if (args.length > 1 && isFunction(args[0])) {
       return $(args[0])(args[1]);
    }

    const sets = args;
    if (sets.length === 0) throw 'illegal argument - intersect expects at least one argument in first parameter list'

    const inner = set1 => set2 =>
        isEmpty(set1) || isEmpty(set2)
            ? []
            : isString(set1)
                ? ($()((set1 as any).split(''))((set2 as any).split(''))).join('')
                : $()(set1 as any)(set2 as any) as any;

    return sets.length === 1
        ? inner(sets[0])
        : $reduce0(uncurry2(inner))(sets) // TODO perhaps rename redue1 to fold
}


/**
 * tsfun | union
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/set/union.spec.ts
 */
export function union<A>(aas: Array<Array<A>>): Array<A>
export function union<A>(comp: Comparator): (aas: Array<Array<A>>) => Array<A>
export function union<A>(comp: Comparator, aas: Array<Array<A>>): Array<A>
export function union(...args): any {

    const $ =
        (compare?: Comparator) =>
            <A>(aas: Array<Array<A>>): Array<A> => {

                // @returns the union of a1 and a2
                const $ = (compare: Comparator) => <A>(as1: Array<A>) =>
                (as2: Array<A>) =>
                    as1.concat(
                        as2.filter(isNot(compare ? includedIn(compare)(as1) : includedIn(as1))))

                if (aas.length < 1) return [];
                if (compare) return aas.reduce(
                    (acc: any, val:any) => val ? $(compare)(acc)(val) : acc)

                // https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays, answer of Gumbo and Mark Amery
                return set([].concat.apply([], aas))
            }

    if (args.length === 1 && isFunction(args[0])) {
        return as => $(args[0])(as)
    }

    if (args.length > 1 && isFunction(args[0])) {
        return $(args[0])(args[1]);
    }

    const aas = args[0];
    if (isEmpty(aas)) return [];
    return $()(aas as any)
}



/**
 * tsfun | unite
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/set/unite.spec.ts
 */
export function unite<A>(as1: Array<A>): (as2: Array<A>) => Array<A>;
export function unite<A>(comp: Comparator, as1: Array<A>): (as2: Array<A>) => Array<A>;
export function unite<A>(...args) {

    const $ = (compare?: Comparator) => <A>(as1: Array<A>) =>
        (as2: Array<A>): Array<A> => compare ? union(compare, [as1, as2]) : union([as1, as2]) as any

    if (args.length > 1 && isFunction(args[0])) {
        return $(args[0])(args[1]);
    }

    const as1 = args[0];
    return (as2: Array<A>) => {

        return $()(as1 as any)(as2 as any) as any
    }
}


/**
 * tsfun | subtract
 *
 * Generate a new list with elements which are contained in as but not in subtrahend
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/set/set.spec.ts
 */
export function subtract<A>(as1: Array<A>): (as2: Array<A>) => Array<A>
export function subtract<A>(comp: Comparator, as1: Array<A>): (as2: Array<A>) => Array<A>
export function subtract<A>(comp: Comparator): (as1: Array<A>) => (as2: Array<A>) => Array<A>
export function subtract<A>(comp: Comparator, as1: Array<A>, as2: Array<A>): Array<A>
export function subtract<A>(...args) {

    // Generate a new list with elements which are contained in as but not in subtrahend
    const $ =
        (compare?: Comparator) =>
            <A>(subtrahend: Array<A>) =>
                (as: Array<A>): Array<A> => {

                    const filterFun = compare
                        ? isNot(compare ? includedIn(compare)(subtrahend) : includedIn(subtrahend))
                        : (() => {
                            const unionSubtrahendsSet = new Set(subtrahend)
                            return (x: A) => !unionSubtrahendsSet.has(x)
                        })()

                    return set(as).filter(filterFun)
                }

    if (args.length === 3) return $(args[0])(args[1])(args[2])

    if (args.length === 1 && isFunction(args[0])) return $(args[0])

    if (args.length > 1 && isFunction(args[0])) {
        return $(args[0])(args[1]);
    }

    const as1 = args[0];

    return (as2: Array<A>) => {

        return $()(as1 as any)(as2 as any) as any
    }
}


/**
 * tsfun | set
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/set/set.spec.ts
 */
export function set<A>(as: Array<A>): Array<A>
export function set<A>(comp: Comparator, as: Array<A>): Array<A>
export function set<A>(comp: Comparator): (as: Array<A>) => Array<A>
export function set(...args): any {

    const $ = (compare?: Comparator) =>
        <A>(as: Array<A>): Array<A> => {

            return compare
                ? as.reduce((acc: Array<A>, val) =>
                        (compare ? includedIn(compare)(acc)(val) : includedIn(acc)(val))
                            ? acc : acc.concat([val])
                    ,[])
                : Array.from(new Set(as))
        }

    if (args.length === 1 && isFunction(args[0])) {
        return <A>(as: Array<A>) => $(args[0])(as);
    }

    if (args.length > 0 && isFunction(args[0])) {
        return $(args[0])(args[1])
    }

    const as = args[0]

    if (isEmpty(as)) return []

    return $()(as as any)
}
