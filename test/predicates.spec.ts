import {equalOn, even, odd, sameOn} from '../src/predicates';
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


        it('equalOn - use with intersectBy',() =>
            expect(intersectBy(equalOn('a.b'))([{a: {b: {c: 'e'}}}, {a: {b: 'c'}}])
            ([{a: {b: {c: 'e'}}}]))
                .toEqual([{a: {b: {c: 'e'}}} as any]));


        it('sameOn - intersect with intersectBy',() =>
            expect(intersectBy(sameOn('a.b'))([{a: {b: 4}}, {a: {b: 5}}])
            ([{a: {b: 5}}]))
                .toEqual([{a: {b: 5}} as any]));
    })
}