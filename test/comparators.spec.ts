import {intersectBy} from "../src/arrays/set_like";
import {
    arrayEquivalent, arrayEquivalentBy, jsonEqual, objectEquivalent, on, onBy,
    sameOn
} from '../src/comparators';
import {isNot, isUndefined} from '../src/predicates';

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
 *
 * arrayEquivalent
 * arrayEquivalentBy
 * objectEquivalent
 *
 * on
 * onBy
 *
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Comparators', () => {

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

        it('object equivalent - equivalent', () =>
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


        it('object equivalent - different values in different order', () =>
            expect(

                objectEquivalent<object>({a: 1, b: 2})({b: 3, a: 1})

            ).toEqual(false));


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


        it('on - with find and isNot - partial arrayEquivalent as predicate', () =>
            expect(

                [{a: {b: [2, 1]}}, {a: {b: [2, 7]}}]
                    .filter(on('a.b')(arrayEquivalent([1, 2])))

            ).toEqual([{a: {b: [2, 1]}}] as any));


        // onBy

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