import {intersectBy} from "../src/arrays/set_like";
import {arrayEquivalent, equalTo, objectEquivalent, on, onBy, sameOn} from '../src/comparators';
import {isNot} from '../src/predicates';

/**
 * arrayEquivalent
 * objectEquivalent
 * on
 * onBy
 *
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Comparators', () => {

        // arraySameAs

        it('array equivalence - equivalent', () =>
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

        // onBy

        it('intersectBy onBy equalTo - symmetric',() =>
            expect(

                intersectBy(onBy(equalTo)('a.b'))([{a: {b: {c: 'e'}}}, {a: {b: 'c'}}])
                ([{a: {b: {c: 'e'}}}]))

                .toEqual([{a: {b: {c: 'e'}}} as any]));


        it('intersectBy on - symmetric',() =>
            expect(

                intersectBy(on('a.b'))([{a: {b: 4}}, {a: {b: 5}}])
                ([{a: {b: 5}}]))

                .toEqual([{a: {b: 5}} as any]));


        it('find on - symmetric',() =>
            expect(

                [{a: {b: 4}}, {a: {b: 5}}]
                    .find(on('a.b')({a: {b: 5}})))

                .toEqual({a: {b: 5}} as any));


        it('find onBy equalTo - exact',() =>
            expect(

                [{a: {b: 4}}, {a: {b: 5}}]
                    .find(onBy(equalTo)('a.b:')(5)))

                .toEqual({a: {b: 5}} as any));


        it('find on - exact',() =>
            expect(

                [{a: {b: 4}}, {a: {b: 5}}]
                    .find(on('a.b:')(5)))

                .toEqual({a: {b: 5}} as any));


        it('find onBy equalTo - symmetric',() =>
            expect(

                [{a: {b: {c: 4}}}, {a: {b: {d: 5}}}]
                    .find(onBy(equalTo)('a.b')({a: {b: {c: 4}}})))

                .toEqual({a: {b: {c: 4}}} as any));


        it('filter - symmetric', () =>
            expect(

                [{a: {b: 4}}, {a: {b: 5}}]
                    .filter(isNot(on('a.b')({a: {b: 5}}))))

                .toEqual([{a: {b: 4}} as any]));


        it('filter - exact', () =>
            expect(

                [{a: {b: 4}}, {a: {b: 5}}].filter(isNot(on('a.b:')(5))))

                .toEqual([{a: {b: 4}} as any]));


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