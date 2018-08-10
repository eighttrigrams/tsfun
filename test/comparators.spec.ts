import {intersectBy} from "../src/arrays/set_like";
import {
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

        // arrayEqualBy


        // arrayEquivalent

        it('array equivalence - equivalent in different order', () =>
            expect(

                arrayEquivalent([1, 4, 7])([7, 4, 1])

            ).toEqual(true));


        it('array equivalence - left list smaller', () =>
            expect(

                arrayEquivalent([1, 4])([7, 4, 1])

            ).toEqual(false));


        it('array equivalence - right list smaller', () =>
            expect(

                arrayEquivalent([1, 4, 7])([7, 4])

            ).toEqual(false));


        it('array equivalence - different elements', () =>
            expect(

                arrayEquivalent([1, 4, 5])([7, 4, 1])

            ).toEqual(false));


        // arrayEquivalentBy

        it('array equivalentBy - equivalent in different order', () =>
            expect(

                arrayEquivalentBy(jsonEqual)([{a: 9}, {c: 7}, {b: 4}])([{b: 4}, {a: 9}, {c: 7}])

            ).toEqual(true));


        it('array equivalentBy - different property value in same order', () =>
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

        it('object equivalent - order of keys does not matter', () =>
            expect(

                objectEquivalent({a: 1, b: 2})({b: 2, a: 1})

            ).toEqual(true));


        it('object equivalent - left side less keys', () =>
            expect(

                objectEquivalent<object>({a: 1})({b: 2, a: 1})

            ).toEqual(false));


        it('object equivalent - right side less keys', () =>
            expect(

                objectEquivalent<object>({a: 1, b: 2})({a: 1})

            ).toEqual(false));


        it('object equivalent - different keys', () =>
            expect(

                objectEquivalent<object>({a: 1, b: 2})({a: 1, c:2})

            ).toEqual(false));


        it('object equivalent - different values', () =>
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

                objectEquivalent<any>({a: new Date(2018, 11, 24)})
                    ({a: new Date(2018, 11, 24)})

            ).toEqual(true));


        it('objectEquivalent - work with Date, not equal', () =>
            expect(

                objectEquivalent<any>({a: new Date(2018, 11, 24)})
                    ({a: new Date(2018, 11, 25)})

            ).toEqual(false));


        it('objectEquivalent - array compared with jsonEqual', () =>
            expect(

                objectEquivalent<object>({a: [2, 1]})({a: [1, 2]})

            ).toEqual(false));


        // objectEquivalentBy

        it('object equivalent - arrayEquivalent', () =>
            expect(

                objectEquivalentBy(arrayEquivalent)({a: [2, 1]})({a: [1, 2]})

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