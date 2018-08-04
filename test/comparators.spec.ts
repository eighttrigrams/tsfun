import {intersectBy} from "../src/arrays/set_like";
import {equalTo, on, onBy, sameOn} from '../src/comparators';
import {isNot} from '../src/predicates';

/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Comparators', () => {

        it('intersectBy onBy equalTo - symmetric',() =>
            expect(intersectBy(onBy(equalTo)('a.b'))([{a: {b: {c: 'e'}}}, {a: {b: 'c'}}])
            ([{a: {b: {c: 'e'}}}]))
                .toEqual([{a: {b: {c: 'e'}}} as any]));


        it('intersectBy on - symmetric',() =>
            expect(intersectBy(on('a.b'))([{a: {b: 4}}, {a: {b: 5}}])
            ([{a: {b: 5}}]))
                .toEqual([{a: {b: 5}} as any]));


        it('find on - symmetric',() =>
            expect([{a: {b: 4}}, {a: {b: 5}}].find(on('a.b')({a: {b: 5}})))
                .toEqual({a: {b: 5}} as any));


        it('find onBy equalTo - exact',() =>
            expect([{a: {b: 4}}, {a: {b: 5}}].find(
                onBy(equalTo)('a.b:')(5)))
                .toEqual({a: {b: 5}} as any));


        it('find on - exact',() =>
            expect([{a: {b: 4}}, {a: {b: 5}}].find(on('a.b:')(5)))
                .toEqual({a: {b: 5}} as any));


        it('find onBy equalTo - symmetric',() =>
            expect([{a: {b: {c: 4}}}, {a: {b: {d: 5}}}].find(
                onBy(equalTo)('a.b')({a: {b: {c: 4}}})))
                .toEqual({a: {b: {c: 4}}} as any));


        it('find onBy equalTo - assymetric',() =>
            expect([{a: {b: {c: 4}}}, {a: {b: {d: 5}}}].find(
                onBy(equalTo)('a.b', 'a.c')({a: {c: {c: 4}}})))
                .toEqual({a: {b: {c: 4}}} as any));


        it('filter - symmetric', () =>
            expect([{a: {b: 4}}, {a: {b: 5}}].filter(
                isNot(on('a.b')({a: {b: 5}}))))
                .toEqual([{a: {b: 4}} as any]));


        it('filter - asymmetric', () =>
            expect([{a: {b: 4}}, {a: {b: 5}}].filter(
                isNot(on('a.b', 'a.c')({a: {c: 5}}))))
                .toEqual([{a: {b: 4}} as any]));


        it('filter - exact', () =>
            expect([{a: {b: 4}}, {a: {b: 5}}].filter(
                isNot(on('a.b:')(5))))
                .toEqual([{a: {b: 4}} as any]));


        it('sameOn - same path',() =>
            expect(sameOn('a.b', {a: {b: 5}}, {a: {b: 5}}))
                .toEqual(true));


        it('sameOn - different path',() =>
            expect(sameOn('a.b', {a: {b: 5}}, {a: {c: 5}}, 'a.c'))
                .toEqual(true));


        it('sameOn - arrays not allowed',() =>
            expect(sameOn('a.b', [5], [5], 'a.c'))
                .toEqual(true));
    })
}