import {intersectBy} from "../src/collections/arrays_set_like";
import {
    arrayEqual,
    arrayEqualBy,
    arrayEquivalent,
    arrayEquivalentBy, containedIn, containedInBy,
    differentFrom,
    differentFromBy, equal, equalBy, equivalent,
    includedIn,
    includedInBy,
    jsonEqual,
    objectEqual,
    objectEqualBy,
    on,
    sameOn
} from '../src/comparators';
import {empty, isArray, isDefined, isEmpty, isNot, isUndefined, undefinedOrEmpty} from '../src/predicates';
import {by} from '../src/core';

/**
 * tripleEqual
 * jsonEqual
 *
 * biggerThan
 * smallerThan
 *
 * differentFrom
 * differentFromBy
 *
 * includedIn
 * includedInBy
 *
 * containedIn
 * containedInBy
 *
 * arrayEqual
 * arrayEqualBy
 *
 * arrayEquivalent
 * arrayEquivalentBy
 *
 * objectEquivalent
 * objectEquivalentBy
 *
 * equal
 * equivalent
 *
 * on
 * onBy
 */
export function main() {

    describe('Comparators', () => {

        // tripleEqual

        // jsonEqual

        // biggerThan

        // smallerThan

        // differentFrom

        it('differentFrom', () =>
            expect(

                differentFrom({a: 1})({a: 1})

            ).toEqual(true));

        // differentFromBy

        it('differentFromBy', () =>
            expect(

                differentFromBy(jsonEqual)({a: {b: 2, c: 3}})({a: {b: 2, c: 3}})

            ).toEqual(false));


        // includedIn

        it('includedIn', () =>
            expect(

                includedIn([2, 5, 1])(1)

            ).toEqual(true));


        it('with filter', () =>
            expect(

                [1, 2, 7].filter(includedIn([2, 5, 1]))

            ).toEqual([1, 2]));


        // includedInBy

        it('includedInBy', () =>
            expect(

                includedInBy(jsonEqual)<any>([{a: 1}, {a: 2}])({a: 1})

            ).toEqual(true));

        // containedIn

        it('containedIn', () =>
            expect(

                containedIn([3, 2, 7])([2, 7])

            ).toEqual(true));


        it('not containedIn', () =>
            expect(

                containedIn([3, 2, 7])([2, 7, 1])

            ).toEqual(false));

        // containedInBy

        it('containedInBy', () =>
            expect(

                containedInBy(on('a'))([{a: 3}, {a: 4}])([{a: 4}])

            ).toEqual(true));


        // arrayEqual

        it('equal', () =>
            expect(

                arrayEqual([1, 2])([1, 2])

            ).toEqual(true));


        it('order does matter', () =>
            expect(

                arrayEqual([1, 2])([2, 1])

            ).toEqual(false));


        it('nested', () =>
            expect(

                arrayEqual([1, [2, [3, 4]]])([1, [2, [3, 4]]])

            ).toEqual(true));


        it('default method is objectEquivalent', () =>
            expect(

                arrayEqual([1, {b: 2, c: 3}])([1, {c: 3, b: 2}])

            ).toEqual(true));


        it('allow strings and numbers', () =>
            expect(

                arrayEqual([{a: 1}, 3, 't'])([{a: 1}, 3, 't'])

            ).toEqual(true));


        it('equal', () =>
            expect(

                arrayEqual([1, {b: 2, c: 3}])([1, {b: 2, c: 3}])

            ).toEqual(true));


        it('using objectEqual', () =>
            expect(

                arrayEqual([1, {c: [1, 2], b: 2}])([1, {b: 2, c: [1, 2]}])

            ).toEqual(true));


        it('using objectEqual order matters', () =>
            expect(

                arrayEqual([1, {c: [1, 2], b: 2}])([1, {b: 2, c: [2, 1]}])

            ).toEqual(false));


        // arrayEqualBy

        it('override objectEquivalent default', () =>
            expect(

                arrayEqualBy(jsonEqual)([1, {b: 2, c: 3}])([1, {c: 3, b: 2}])

            ).toEqual(false));


        // arrayEquivalent

        it('equivalent in different order', () =>
            expect(

                arrayEquivalent([1, 4, 7])([7, 4, 1])

            ).toEqual(true));


        it('left side subset', () =>
            expect(

                arrayEquivalent([1, 4])([7, 4, 1])

            ).toEqual(false));


        it('left list smaller but same set', () =>
            expect(

                arrayEquivalent([1, 4])([1, 4, 1, 4, 1])

            ).toEqual(true));


        it('right list smaller', () =>
            expect(

                arrayEquivalent([1, 4, 7])([7, 4])

            ).toEqual(false));


        it('right list smaller but same set', () =>
            expect(

                arrayEquivalent([1, 4, 1, 4, 1])([1, 4])

            ).toEqual(true));


        it('different elements', () =>
            expect(

                arrayEquivalent([1, 4, 5])([7, 4, 1])

            ).toEqual(false));


        it('nested arrays', () =>
            expect(

                arrayEquivalent([1, [4, 7]])([[7, 4], 1])

            ).toEqual(true));


        it('nested arrays different sizes', () =>
            expect(

                arrayEquivalent
                ([1, [7, [5, 5, 7], 7]])
                ([[7, 7, [5, 5, 7], [5, 5, 7]], 1])

            ).toEqual(true));


        it('default comparator is objectEquivalentBy(arrayEquivalent)', () =>
            expect(

                arrayEquivalent
                ([{c: 7}, {c: 5, b: 4}])
                ([{b: 4, c: 5}, {c: 7}])

            ).toEqual(true));


        it('arrayEquivalent with objectEquivalent - nest to arbitrary depth ', () =>
            expect(

                arrayEquivalent
                    ([{c: 7}, {c: [{g: [[1, 1, {m: 9, n: 10}], 8], d: 5}, 3], b: 4}])
                    ([{b: 4, c: [3, {d: 5, g: [8, [1, {n: 10, m: 9}, 1]]}]}, {c: 7}])

            ).toEqual(true));


        // arrayEquivalentBy

        it('arrayEquivalentBy - equivalent in different order', () =>
            expect(

                arrayEquivalentBy(jsonEqual)([{a: 9}, {c: 7}, {b: 4}])([{b: 4}, {a: 9}, {c: 7}])

            ).toEqual(true));


        it('arrayEquivalentBy - different property value in same order', () =>
            expect(

                arrayEquivalentBy(jsonEqual)([{a: 10}, {c: 7}, {b: 4}])([{a: 9}, {c: 7}, {b: 4}])

            ).toEqual(false));


        it('array equivalentBy - left list smaller', () =>
            expect(

                arrayEquivalentBy(jsonEqual)([{c: 7}])([{c: 7}, {b: 4}])

            ).toEqual(false));


        it('array equivalentBy - right list smaller', () =>
            expect(

                arrayEquivalentBy(jsonEqual)([{c: 7}, {b: 4}])([{c: 7}])

            ).toEqual(false));


        // objectEquivalent

        it('order of keys does not matter', () =>
            expect(

                objectEqual({a: 1, b: 2})({b: 2, a: 1})

            ).toEqual(true));


        it('left side less keys', () =>
            expect(

                objectEqual({a: 1})({b: 2, a: 1})

            ).toEqual(false));


        it('right side less keys', () =>
            expect(

                objectEqual({a: 1, b: 2})({a: 1})

            ).toEqual(false));


        it('different keys', () =>
            expect(

                objectEqual({a: 1, b: 2})({a: 1, c:2})

            ).toEqual(false));


        it('different values', () =>
            expect(

                objectEqual({a: 1, b: 2})({a: 1, b: 3})

            ).toEqual(false));


        it('objectEquivalent - different values in different order', () =>
            expect(

                objectEqual({a: 1, b: 2})({b: 3, a: 1})

            ).toEqual(false));


        it('objectEquivalent - recursive, keys in different order', () =>
            expect(

                objectEqual({e: 0, a: {d: 2, c: 1}})({a: {c: 1, d: 2}, e: 0})

            ).toEqual(true));


        it('objectEquivalent - work with Date, equal', () =>
            expect(

                objectEqual({a: new Date(2018, 11, 24)})
                    ({a: new Date(2018, 11, 24)})

            ).toEqual(true));


        it('objectEquivalent - work with Date, not equal', () =>
            expect(

                objectEqual({a: new Date(2018, 11, 24)})
                    ({a: new Date(2018, 11, 25)})

            ).toEqual(false));


        it('objectEquivalent - array compared with arrayEqual', () =>
            expect(

                objectEqual({a: [2, 1]})({a: [1, 2]})

            ).toEqual(false));


        it('objectEquivalent - mutual default nesting', () =>
            expect(

                objectEqual({a: [2, {a: 3, b: 4}]})({a: [2, {a: 3, b: 4}]})

            ).toEqual(true));


        it('objectEquivalent - mutual default nesting, order matters in arrays, but not for keys', () =>
            expect(

                objectEqual
                ({a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
                ({c: 5, a: [2, {a: [1, {e: 7, f: [1, 2]}], b: 4}]})

            ).toEqual(true));


        it('mutual default nesting, order matters in arrays!', () =>
            expect(

                objectEqual({a: [{b: 4, a: 3}, 2], c: 5})({c: 5, a: [2, {a: 3, b: 4}]})

            ).toEqual(false));


        // objectEquivalentBy

        it('make that order does not matter in array when nested', () =>
            expect(

                objectEqualBy(arrayEquivalent)
                ({a: [{b: 4, a: [2, 1]}, 2], c: 5})({c: 5, a: [2, {a: [1, 2], b: 4}]})

            ).toEqual(true));


        it('with arrayEquivalent', () =>
            expect(

                objectEqualBy(arrayEquivalent)
                ({a: [2, 1]})
                ({a: [1, 2]})

            ).toEqual(true));


        it('with arrayEquivalent nested', () =>
            expect(

                objectEqualBy(arrayEquivalent)
                ({a: [2, {a: 3, b: [3, 1]}]})
                ({a: [{a: 3, b: [1, 3]}, 2]})

            ).toEqual(true));


        it('object equivalent - order on keys and arrays does not matter', () =>
            expect(

                objectEqualBy(arrayEquivalent)
                ({a: [2, 1], b: 0})
                ({b: 0, a: [1, 2]})

            ).toEqual(true));


        it('object equivalent - use with arrayEquivalentBy', () =>
            expect(

                objectEqualBy(arrayEqualBy(objectEqual))
                    ({a: [{e: 5, c: 4}, 2], b: 0})
                    ({b: 0, a: [{c: 4, e: 5}, 2]})

            ).toEqual(true));


        // equal

        it('equal - number', () =>
            expect(

                equal
                (1)
                (1)

            ).toEqual(true));


        it('strings equal', () =>
            expect(

                equal
                ("2s")
                ("2s")

            ).toEqual(true));


        it('strings not equal', () =>
            expect(

                equal
                ("2s")
                ("2st")

            ).toEqual(false));


        it('undefined', () =>
            expect(

                equal
                (undefined)
                (undefined)

            ).toEqual(true));


        it('Date true', () =>
            expect(

                equal
                (new Date(2018, 11))
                (new Date(2018, 11))

            ).toEqual(true));


        it('Date false', () =>
            expect(

                equal
                (new Date(2018, 11))
                (new Date(2018, 12))

            ).toEqual(false));


        it('equal - number vs string', () =>
            expect(

                equal
                (1)
                ("1")

            ).toEqual(false));


        it('equal - mutual default nesting, order matters in arrays, but not for keys', () =>
            expect(

                equal
                ({a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
                ({c: 5, a: [2, {a: [1, {e: 7, f: [1, 2]}], b: 4}]})

            ).toEqual(true));


        it('Array - recursive Object Array Nesting', () =>
            expect(

                equal
                ([2, {b: 4, a: [1, {f: [1, 2], e: 7}]}])
                ([2, {a: [1, {e: 7, f: [1, 2]}], b: 4}])

            ).toEqual(true));


        it('Array - recursive Object Array Nesting - Array order matters!', () =>
            expect(

                equal
                ([2, {b: 4, a: [1, {f: [2, 1], e: 7}]}])
                ([2, {a: [1, {e: 7, f: [1, 2]}], b: 4}])

            ).toEqual(false));


        // equalBy


        it('Object - recursive Object Array Nesting', () =>
            expect(

                equalBy(arrayEquivalent)
                ({a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
                ({c: 5, a: [2, {a: [1, {e: 7, f: [2, 1]}], b: 4}]})

            ).toEqual(true));


        it('Array - recursive Object Array Nesting', () =>
            expect(

                equalBy(arrayEquivalent)
                ([2, {b: 4, a: [1, {f: [2, 1], e: 7}]}])
                ([2, {a: [1, {e: 7, f: [1, 2]}], b: 4}])

            ).toEqual(true));


        // equivalent

        it('number', () =>
            expect(

                equivalent
                (1)
                (1)

            ).toEqual(true));


        it('strings equal', () =>
            expect(

                equivalent
                ("2s")
                ("2s")

            ).toEqual(true));


        it('strings not equal', () =>
            expect(

                equivalent
                ("2s")
                ("2st")

            ).toEqual(false));


        it('undefined', () =>
            expect(

                equivalent
                (undefined)
                (undefined)

            ).toEqual(true));


        it('recursive Object Array nesting', () =>
            expect(

                equivalent
                ({a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
                ({c: 5, a: [2, {a: [1, {e: 7, f: [2, 1, 1, 1]}], b: 4}]})

            ).toEqual(true));


        it('recursive Array Object nesting', () =>
            expect(

                equivalent
                ([2, {b: 4, a: [1, {f: [2, 1], e: 7}]}])
                ([2, {a: [1, {e: 7, f: [1, 2, 1, 1, 1]}], b: 4}])

            ).toEqual(true));

        // on

        it('on - with find - symmetric',() =>
            expect(

                [{a: {b: 4}}, {a: {b: 5}}]
                    .find(on('a.b')({a: {b: 5}})))

                .toEqual({a: {b: 5}} as any));


        it('on - with find - exact',() =>
            expect(

                [{a: {b: 4}}, {a: {b: 5}}]
                    .find(on('a.b:')(5)))

                .toEqual({a: {b: 5}} as any));


        it('on - with filter and isNot - symmetric', () =>
            expect(

                [{a: {b: 4}}, {a: {b: 5}}]
                    .filter(isNot(on('a.b')({a: {b: 5}}))))

                .toEqual([{a: {b: 4}} as any]));


        it('on - with filter and isNot - exact', () =>
            expect(

                [{a: {b: 4}}, {a: {b: 5}}].filter(isNot(on('a.b:')(5))))

                .toEqual([{a: {b: 4}} as any]));


        it('on - with intersectBy - symmetric',() =>
            expect(

                intersectBy(on('a.b'))([{a: {b: 4}}, {a: {b: 5}}])
                ([{a: {b: 5}}]))

                .toEqual([{a: {b: 5}} as any]));


        it('on - with find - isUndefined predicate', () =>
            expect(

                [{a: {b: 4}}, {a: {c: 5}}]
                    .filter(on('a.b', isUndefined))

            ).toEqual([{a: {c: 5}}] as any));


        it('on - with find and isNot - isUndefined predicate', () =>
            expect(

                [{a: {b: 4}}, {a: {c: 5}}]
                    .filter(isNot(on('a.b', isUndefined)))

            ).toEqual([{a: {b: 4}}] as any));


        it('on - with find - isDefined predicate', () =>
            expect(

                [{a: {b: 4}}, {a: {c: 5}}]
                    .filter(on('a.b', isDefined))

            ).toEqual([{a: {b: 4}}] as any));


        it('on - with find - isEmpty predicate', () =>
            expect(

                [{a: [1, 2, 4]}, {a: []}]
                    .filter(on('a', isEmpty))

            ).toEqual([{a: []}] as any));


        it('on - with find and isNot - isEmpty predicate', () =>
            expect(

                [{a: [1, 2, 4]}, {a: []}]
                    .filter(isNot(on('a', empty)))

            ).toEqual([{a: [1, 2, 4]}] as any));


        it('on - with find and isNot - isUndefinedOrEmpty predicate works with undefined', () =>
            expect(

                [{a: [1, 2, 4]}, {a: undefined}]
                    .filter(isNot(on('a', undefinedOrEmpty)))

            ).toEqual([{a: [1, 2, 4]}] as any));


        // it('on - with find and isNot - isUndefinedOrEmpty predicate works with undefined', () =>
        //     expect(
        //
        //         [{a: [1, 2, 4]}, {b: undefined}] <- make that work with path not matching
        //             .filter(isNot(on('a')(isUndefinedOrEmpty)))
        //
        //     ).toEqual([{a: [1, 2, 4]}] as any));


        it('on - with find and isNot - partial arrayEquivalent as predicate, without path match', () =>
            expect(

                [{a: {b: [2, 1]}}, {a: {b: [2, 7]}}]
                    .filter(on('a.b:', arrayEquivalent)([1, 2]))

            ).toEqual([{a: {b: [2, 1]}}] as any));


        it('on - with find and isArray', () =>
            expect(

                [{a: {b: [2, 1]}}, {c: {a: 1}}, {}]
                    .filter(on('a.b', isArray))

            ).toEqual([{a: {b: [2, 1]}}] as any));


        // onBy

        it('on - with find and isNot - user arrayEquivalent with By when you want ot match path', () =>
            expect(

                [{a: {b: [2, 1]}}, {a: {b: [2, 7]}}]
                    .filter(on('a.b', arrayEquivalent)({a: {b: [1, 2]}}))

            ).toEqual([{a: {b: [2, 1]}}] as any));


        it('intersectBy onBy equalTo - symmetric',() =>
            expect(

                intersectBy(on('a.b', jsonEqual))([{a: {b: {c: 'e'}}}, {a: {b: 'c'}}])
                ([{a: {b: {c: 'e'}}}]))

                .toEqual([{a: {b: {c: 'e'}}} as any]));


        it('find onBy equalTo - exact',() =>
            expect(

                [{a: {b: 4}}, {a: {b: 5}}]
                    .find(on('a.b:', jsonEqual)(5)))

                .toEqual({a: {b: 5}} as any));


        it('find onBy equalTo - symmetric',() =>
            expect(

                [{a: {b: {c: 4}}}, {a: {b: {d: 5}}}]
                    .find(on('a.b', jsonEqual)({a: {b: {c: 4}}})))

                .toEqual({a: {b: {c: 4}}} as any));


        // sameOn

        it('sameOn - same path',() =>
            expect(

                sameOn('a.b', {a: {b: 5}}, {a: {b: 5}}))

                .toEqual(true));


        it('sameOn - arrays not allowed',() =>
            expect(

                sameOn('a.b', [5], [5]))

                .toEqual(true));
    })
}