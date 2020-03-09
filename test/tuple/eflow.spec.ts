import {eflow} from '../../src/tuple';
import {Either} from '../../src/type';
import {identity} from '../../src/core';
import {val} from '../../src/composition';


/**
 * tsfun | eflow
 * monadic flow function
 *
 * @author Daniel de Oliveira
 */
describe('eflow', () => {

    const fail = (x: any) => ['fail', undefined] as Either<string, number>;
    const dec = (x: number) => (x-1 === 0
        ? ['nope', undefined] : [undefined, x-1]) as Either<string, number>;
    const safediv = (x: number) => (y: number) => (y === 0
        ? ['safediv fail', undefined]
        : [undefined, x / y]) as Either<string, number>;
    const add = (x: number, y: number) => x + y;
    const square = (x: number) => x * x;


    it('use previous value', () =>

        expect(

            eflow(add)([undefined, 5], dec, dec)

        ).toEqual([undefined, 7])
    );


    it('start already failing', () =>

        expect(

            eflow(add)(['nope', undefined], dec, dec)

        ).toEqual(['nope', undefined])
    );


    it('fail first computation', () =>

        expect(

            eflow(add)([undefined, 1], dec, fail)

        ).toEqual(['nope', undefined])
    );


    it('fail second computation', () =>

        expect(

            eflow(add)([undefined, 2], dec, fail)

        ).toEqual(['fail', undefined])
    );


    it('3 / (3 / 0)', () =>

        expect(

            eflow()([undefined, 0], safediv(3), safediv(3))

        ).toEqual(['safediv fail', undefined])
    );


    it('3 / (3 / 1)', () =>

        expect(

            eflow()([undefined, 1], safediv(3), safediv(3))

        ).toEqual([undefined, 3])
    );


    it('3 / (3 / 0) - on failure', () =>

        expect(

            eflow(identity, val(19), val(17))([undefined, 0], safediv(3), safediv(3))

        ).toEqual(17)
    );


    it('3 / (3 / 1) - on success', () =>

        expect(

            eflow(identity, square)([undefined, 1], safediv(3), safediv(3))

        ).toEqual(9)
    );
});