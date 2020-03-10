import {fromSuccess, mcompose, midentity, mlift, mmatch, mval, toMaybe} from '../../src/tuple';
import {Maybe} from '../../src/type';
import {identity} from '../../src/core';
import {cond, flow, throws, val} from '../../src/composition';
import {map} from '../../src/associative';
import {isSuccess} from '../../src/predicate';
import {filter} from '../../src/collection';
import {lessThan} from '../../src/comparator';


/**
 * tsfun | mcompose
 * monadic compose function
 *
 * @author Daniel de Oliveira
 */
describe('mcompose', () => {

    const zero = (_: any) => [0] as Maybe<number>;
    const dec = (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>;
    const safediv = (x: number) => (y: number) => (y === 0 ? [] : [x / y]) as Maybe<number>;
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


    it('get all intermediate values', () =>

        expect(

            mcompose(midentity, dec, dec)([3])

        ).toEqual([[1, 2, 3]])
    );


    it('failure', () =>

        expect(

            mcompose(add, dec, dec)([2])

        ).toEqual([])
    );


    it('dont even start', () =>

        expect(

            mcompose(add, safediv(3), dec)([])

        ).toEqual([])
    );


    it('dont get to savediv', () =>

        expect(

            mcompose(add, safediv(3), dec)([1])

        ).toEqual([])
    );


    it('(3 / 0)', () =>

        expect(

            mcompose(identity, safediv(3), zero)([6])

        ).toEqual([])
    );


    it('(3 / 2)^2', () =>

        expect(

            mcompose(square, safediv(6), dec)([2])

        ).toEqual([36])
    );


    it('use with flow', () =>

        expect(

            flow(
                [3, 0, 4],
                map(toMaybe),
                map(
                    mcompose(
                        square,
                        mlift(cond(lessThan(2), throws('')) as any),
                        safediv(6))),
                filter(isSuccess as any),
                map(fromSuccess))

        ).toEqual([4])
    );
});