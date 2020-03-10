import {mcompose, mlift, mval, toMaybe} from '../../src/tuple';
import {Maybe} from '../../src/type';
import {identity} from '../../src/core';
import {flow, val} from '../../src/composition';
import {map} from '../../src/associative';
import {isSuccess} from '../../src/predicate';
import {filter} from '../../src/collection';


/**
 * tsfun | mcompose
 * monadic compose function
 *
 * @author Daniel de Oliveira
 */
describe('mcompose', () => {

    const dec = (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>;
    const safediv = (x: number) => (y: number) => (y === 0 ? [] : [x / y]) as Maybe<number>;
    const div = (x: number) => (y: number) => x / y;
    const add = (x: number, y: number) => x + y;
    const square = (x: number) => x * x;

    it('success', () =>

        expect(

            mcompose(add, mval(3), mval(3))([0])

        ).toEqual([6])
    );


    it('use previous value', () =>

        expect(

            mcompose(add, dec, dec)([3])

        ).toEqual([3])
    );


    it('failure', () =>

        expect(

            mcompose(add, dec, dec)([2])

        ).toEqual([])
    );


    it('dont even start', () =>

        expect(

            mcompose(add, dec, dec)([])

        ).toEqual([])
    );


    it('3 / (3 / 0)', () =>

        expect(

            mcompose(identity, safediv(3), safediv(3))([0])

        ).toEqual([])
    );


    it('6 / (3 / 1.5)', () =>

        expect(

            mcompose(square, safediv(6), safediv(3))([1.5])

        ).toEqual([9])
    );


    it('use with flow', () =>

        expect(

            flow(
                [1.5, 0,0, 2.0],
                map(toMaybe),
                map(mcompose(square, mlift(div(6)), safediv(3))),
                filter(isSuccess as any))

        ).toEqual([[9],[16]])
    );
});