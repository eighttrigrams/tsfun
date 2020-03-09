import {mflow, mval} from '../../src/tuple';
import {Maybe} from '../../src/type';
import {identity} from '../../src/core';


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

    it('mflow - success', () =>

        expect(

            mflow(add)(0, mval(3), mval(3))

        ).toEqual([6])
    );


    it('mflow - use previous value', () =>

        expect(

            mflow(add)(3, dec, dec)

        ).toEqual([3])
    );


    it('mflow - failure', () =>

        expect(

            mflow(add)(2, dec, dec)

        ).toEqual([])
    );


    // 3 / (3 / 0)

    it('3 / (3 / 0)', () =>

        expect(

            mflow()(0, safediv(3), safediv(3))

        ).toEqual([])
    );


    it('3 / (3 / 1)', () =>

        expect(

            mflow()(1, safediv(3), safediv(3))

        ).toEqual([3])
    );
});