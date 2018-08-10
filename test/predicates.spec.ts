/**
 * @author Daniel de Oliveira
 */
import {isEven, isOdd} from '../src/predicates';

export function main() {

    describe('Drop', () => {

        it('even', () =>
            expect(

                isEven(4))

                .toEqual(true));


        it('even - 0', () =>
            expect(

                isEven(0))

                .toEqual(true));


        it('even - -2', () =>
            expect(

                isEven(0))

                .toEqual(true));


        it('odd', () =>
            expect(

                isOdd(7))

                .toEqual(true));


        it('odd - -1', () =>
            expect(

                isOdd(-1))

                .toEqual(true))
    })
}