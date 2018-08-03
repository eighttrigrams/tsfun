import {equalTo, even, isNot, odd, on, onBy} from '../src/predicates';
import {intersectBy} from "../src/arrays/sets";
/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Drop', () => {

        it('even', () =>
            expect(even()(4)).toEqual(true));


        it('even - 0', () =>
            expect(even()(0))
                .toEqual(true));


        it('even - -2', () =>
            expect(even()(0))
                .toEqual(true));


        it('odd', () =>
            expect(odd()(7))
                .toEqual(true));


        it('odd - -1', () =>
            expect(odd()(-1)).toEqual(true));





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
                onBy(equalTo)('a.b!')(5)))
                .toEqual({a: {b: 5}} as any));


        it('find on - exact',() =>
            expect([{a: {b: 4}}, {a: {b: 5}}].find(on('a.b!')(5)))
                .toEqual({a: {b: 5}} as any));


        it('find onBy equalTo - symmetric',() =>
            expect([{a: {b: {c: 4}}}, {a: {b: {d: 5}}}].find(
                onBy(equalTo)('a.b')({a: {b: {c: 4}}})))
                .toEqual({a: {b: {c: 4}}} as any));


        it('find onBy equalTo - assymetric',() =>
            expect([{a: {b: {c: 4}}}, {a: {b: {d: 5}}}].find(
                onBy(equalTo)('a.b', 'a.c')({a: {c: {c: 4}}})))
                .toEqual({a: {b: {c: 4}}} as any));


        it('filter - symmetric', () => {

            expect([{a: {b: 4}}, {a: {b: 5}}].filter(
                isNot(on('a.b')({a: {b: 5}}))))
                .toEqual([{a: {b: 4}} as any]);
        });


        it('filter - asymmetric', () => {

            expect([{a: {b: 4}}, {a: {b: 5}}].filter(
                isNot(on('a.b', 'a.c')({a: {c: 5}}))))
                .toEqual([{a: {b: 4}} as any]);
        });


        it('filter - exact', () => {

            expect([{a: {b: 4}}, {a: {b: 5}}].filter(
                isNot(on('a.b!')(5))))
                .toEqual([{a: {b: 4}} as any]);
        });
    })
}