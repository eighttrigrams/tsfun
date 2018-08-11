import {intersectBy} from "../src/arrays/set_like";
import {
    arrayEqual, arrayEqualBy,
    arrayEquivalent, arrayEquivalentBy, differentFrom, differentFromBy, jsonEqual, objectEquivalent,
    objectEquivalentBy, on,
    onBy,
    sameOn
} from '../src/comparators';
import {isArray, isDefined, isNot, isUndefined} from '../src/predicates';
import {isEmpty, isUndefinedOrEmpty} from '../src/coll';

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
 * arrayEqual
 * arrayEqualBy
 *
 * arrayEquivalent
 * arrayEquivalentBy
 *
 * objectEquivalent
 * objectEquivalentBy
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

                differentFromBy(jsonEqual)({a: 1})({a: 1})

            ).toEqual(false));

        // arrayEqual

        it('arrayEqual - equal', () =>
            expect(

                arrayEqual([1, 2])([1, 2])

            ).toEqual(true));


        it('arrayEqual - order does matter', () =>
            expect(

                arrayEqual([1, 2])([2, 1])

            ).toEqual(false));


        it('arrayEqual - nested', () =>
            expect(

                arrayEqual([1, [2, [3, 4]]])([1, [2, [3, 4]]])

            ).toEqual(true));


        it('arrayEqualBy default method is objectEquivalent', () =>
            expect(

                arrayEqual([1, {b: 2, c: 3}])([1, {c: 3, b: 2}])

            ).toEqual(true));

        it('arrayEqualBy - allow strings and numbers', () =>
            expect(

                arrayEqual([{a: 1}, 3, 't'])([{a: 1}, 3, 't'])

            ).toEqual(true));


        it('arrayEqualBy - equal', () =>
            expect(

                arrayEqual([1, {b: 2, c: 3}])([1, {b: 2, c: 3}])

            ).toEqual(true));


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


        it('left list smaller', () =>
            expect(

                arrayEquivalent([1, 4])([7, 4, 1])

            ).toEqual(false));


        it('right list smaller', () =>
            expect(

                arrayEquivalent([1, 4, 7])([7, 4])

            ).toEqual(false));


        it('different elements', () =>
            expect(

                arrayEquivalent([1, 4, 5])([7, 4, 1])

            ).toEqual(false));


        it('arrayEquivalent - nested arrays', () =>
            expect(

                arrayEquivalent([1, [4, 7]])([[7, 4], 1])

            ).toEqual(true));


        it('array equivalent - default comparator is objectEquivalent', () =>
            expect(

                arrayEquivalent
                ([{c: 7}, {c: 5, b: 4}])
                ([{b: 4, c: 5}, {c: 7}])

            ).toEqual(true));

        it('arrayEquivalent with objectEquivalent - nest to arbitrary depth ', () =>
            expect(

                arrayEquivalent
                    ([{c: 7}, {c: [{g: [9, 8], d: 5}, 3], b: 4}])
                    ([{b: 4, c: [3, {d: 5, g: [8, 9]}]}, {c: 7}])

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

                arrayEquivalentBy(jsonEqual)<any>([{c: 7}])([{c: 7}, {b: 4}])

            ).toEqual(false));


        it('array equivalentBy - right list smaller', () =>
            expect(

                arrayEquivalentBy(jsonEqual)<any>([{c: 7}, {b: 4}])([{c: 7}])

            ).toEqual(false));


        // objectEquivalent

        it('order of keys does not matter', () =>
            expect(

                objectEquivalent({a: 1, b: 2})({b: 2, a: 1})

            ).toEqual(true));


        it('left side less keys', () =>
            expect(

                objectEquivalent<object>({a: 1})({b: 2, a: 1})

            ).toEqual(false));


        it('right side less keys', () =>
            expect(

                objectEquivalent<object>({a: 1, b: 2})({a: 1})

            ).toEqual(false));


        it('different keys', () =>
            expect(

                objectEquivalent<object>({a: 1, b: 2})({a: 1, c:2})

            ).toEqual(false));


        it('different values', () =>
            expect(

                objectEquivalent<object>({a: 1, b: 2})({a: 1, b: 3})

            ).toEqual(false));


        it('objectEquivalent - different values in different order', () =>
            expect(

                objectEquivalent<object>({a: 1, b: 2})({b: 3, a: 1})

            ).toEqual(false));


        it('objectEquivalent - recursive, keys in different order', () =>
            expect(

                objectEquivalent<any>({e: 0, a: {d: 2, c: 1}})({a: {c: 1, d: 2}, e: 0})

            ).toEqual(true));


        it('objectEquivalent - work with Date, equal', () =>
            expect(

                objectEquivalent({a: new Date(2018, 11, 24)})
                    ({a: new Date(2018, 11, 24)})

            ).toEqual(true));


        it('objectEquivalent - work with Date, not equal', () =>
            expect(

                objectEquivalent({a: new Date(2018, 11, 24)})
                    ({a: new Date(2018, 11, 25)})

            ).toEqual(false));


        it('objectEquivalent - array compared with jsonEqual', () =>
            expect(

                objectEquivalent({a: [2, 1]})({a: [1, 2]})

            ).toEqual(false));


        it('objectEquivalent - mutual default nesting', () =>
            expect(

                objectEquivalent({a: [2, {a: 3, b: 4}]})({a: [2, {a: 3, b: 4}]})

            ).toEqual(true));


        it('objectEquivalent - mutual default nesting, order matters in arrays, but not for keys', () =>
            expect(

                objectEquivalent
                ({a: [2, {b: 4, a: [1, {f: [1, 2], e: 7}]}], c: 5})
                ({c: 5, a: [2, {a: [1, {e: 7, f: [1, 2]}], b: 4}]})

            ).toEqual(true));


        it('objectEquivalent - mutual default nesting, order matters in arrays!', () =>
            expect(

                objectEquivalent({a: [{b: 4, a: 3}, 2], c: 5})({c: 5, a: [2, {a: 3, b: 4}]})

            ).toEqual(false));


        // objectEquivalentBy

        it('object equivalent - arrayEquivalent', () =>
            expect(

                objectEquivalentBy(arrayEquivalent)({a: [2, 1]})({a: [1, 2]})

            ).toEqual(true));


        xit('object equivalent - arrayEquivalent2', () =>
            expect(

                objectEquivalentBy(arrayEquivalent)({a: [2, {a: 3, b: 4}]})({a: [{a: 3, b: 4}, 2]})

            ).toEqual(true));


        it('object equivalent - order on keys and arrays does not matter', () =>
            expect(

                objectEquivalentBy(arrayEquivalent)({a: [2, 1], b: 0})({b: 0, a: [1, 2]})

            ).toEqual(true));


        it('object equivalent - use with arrayEquivalentBy', () =>
            expect(

                objectEquivalentBy(arrayEqualBy(objectEquivalent))
                    ({a: [{e: 5, c: 4}, 2], b: 0})
                    ({b: 0, a: [{c: 4, e: 5}, 2]})

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
                    .filter(on('a.b')(isUndefined))

            ).toEqual([{a: {c: 5}}] as any));


        it('on - with find and isNot - isUndefined predicate', () =>
            expect(

                [{a: {b: 4}}, {a: {c: 5}}]
                    .filter(isNot(on('a.b')(isUndefined)))

            ).toEqual([{a: {b: 4}}] as any));


        it('on - with find - isDefined predicate', () =>
            expect(

                [{a: {b: 4}}, {a: {c: 5}}]
                    .filter(on('a.b')(isDefined))

            ).toEqual([{a: {b: 4}}] as any));


        it('on - with find - isEmpty predicate', () =>
            expect(

                [{a: [1, 2, 4]}, {a: []}]
                    .filter(on('a')(isEmpty))

            ).toEqual([{a: []}] as any));


        it('on - with find and isNot - isEmpty predicate', () =>
            expect(

                [{a: [1, 2, 4]}, {a: []}]
                    .filter(isNot(on('a')(isEmpty)))

            ).toEqual([{a: [1, 2, 4]}] as any));


        it('on - with find and isNot - isUndefinedOrEmpty predicate works with undefined', () =>
            expect(

                [{a: [1, 2, 4]}, {a: undefined}]
                    .filter(isNot(on('a')(isUndefinedOrEmpty)))

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
                    .filter(on('a.b')(arrayEquivalent([1, 2])))

            ).toEqual([{a: {b: [2, 1]}}] as any));


        it('on - with find and isArray', () =>
            expect(

                [{a: {b: [2, 1]}}, {c: {a: 1}}, {}]
                    .filter(on('a.b')(isArray))

            ).toEqual([{a: {b: [2, 1]}}] as any));


        // onBy

        it('on - with find and isNot - user arrayEquivalent with By when you want ot match path', () =>
            expect(

                [{a: {b: [2, 1]}}, {a: {b: [2, 7]}}]
                    .filter(onBy(arrayEquivalent)('a.b')({a: {b: [1, 2]}}))

            ).toEqual([{a: {b: [2, 1]}}] as any));


        it('intersectBy onBy equalTo - symmetric',() =>
            expect(

                intersectBy(onBy(jsonEqual)('a.b'))([{a: {b: {c: 'e'}}}, {a: {b: 'c'}}])
                ([{a: {b: {c: 'e'}}}]))

                .toEqual([{a: {b: {c: 'e'}}} as any]));


        it('find onBy equalTo - exact',() =>
            expect(

                [{a: {b: 4}}, {a: {b: 5}}]
                    .find(onBy(jsonEqual)('a.b:')(5)))

                .toEqual({a: {b: 5}} as any));


        it('find onBy equalTo - symmetric',() =>
            expect(

                [{a: {b: {c: 4}}}, {a: {b: {d: 5}}}]
                    .find(onBy(jsonEqual)('a.b')({a: {b: {c: 4}}})))

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