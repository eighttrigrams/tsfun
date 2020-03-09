import {mflow, mval} from '../../src/tuple';
import {Maybe} from '../../src/type';
import {identity} from '../../src/core';
import {val} from '../../src/composition';


/**
 * tsfun | mflow
 * monadic flow function
 *
 * @author Daniel de Oliveira
 */
describe('mflow', () => {

    const dec = (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>;
    const safediv = (x: number) => (y: number) => (y === 0 ? [] : [x / y]) as Maybe<number>;
    const add = (x: number, y: number) => x + y;
    const square = (x: number) => x * x;

    it('success', () =>

        expect(

            mflow(add)([0], mval(3), mval(3))

        ).toEqual([6])
    );


    it('use previous value', () =>

        expect(

            mflow(add)([3], dec, dec)

        ).toEqual([3])
    );


    it('failure', () =>

        expect(

            mflow(add)([2], dec, dec)

        ).toEqual([])
    );


    it('dont even start', () =>

        expect(

            mflow(add)([], dec, dec)

        ).toEqual([])
    );


    it('3 / (3 / 0)', () =>

        expect(

            mflow()([0], safediv(3), safediv(3))

        ).toEqual([])
    );


    it('3 / (3 / 1)', () =>

        expect(

            (mflow()([1], safediv(3), safediv(3)))

        ).toEqual([3])
    );


    it('3 / (3 / 0) - on failure', () =>

        expect(

            mflow(identity, val(19), val(17))([0], safediv(3), safediv(3))

        ).toEqual(17)
    );


    it('3 / (3 / 1) - on success', () =>

        expect(

            mflow(identity, square)([1], safediv(3), safediv(3))

        ).toEqual(9)
    );
});