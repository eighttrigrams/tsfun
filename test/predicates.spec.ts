/**
 * @author Daniel de Oliveira
 */
import {even, odd} from '../src/predicates';

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
            expect(odd()(-1)).toEqual(true))
    })
}