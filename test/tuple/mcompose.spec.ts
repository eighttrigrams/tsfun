import {elift, eVal, getValue, mcompose, midentity, mlift, mVal, toEither, toMaybe} from '../../src/tuple';
import {Either, Maybe} from '../../src/type';
import {identity} from '../../src/core';
import {cond, flow, throws} from '../../src/composition';
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
    const zeroE = (_: any) => [undefined, 0] as Either<string, number>;
    const dec = (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>;
    const decE = (x: number) => (x-1 === 0 ? ['decfailed', undefined] : [undefined, x-1]) as Either<string, number>;
    const safediv = (x: number) => (y: number) => (y === 0 ? [] : [x / y]) as Maybe<number>;
    const safedivE = (x: number) => (y: number) => (y === 0 ? ['safedivfail', undefined] : [undefined, x / y]) as Either<string, number>;
    const add = (x: number, y: number) => x + y;
    const square = (x: number) => x * x;


    it('success - Maybe', () =>

        expect(

            mcompose(square, dec)([3])

        ).toEqual([4])
    );


    it('success - Either', () =>

        expect(

            mcompose(square, decE)([undefined, 3])

        ).toEqual([undefined, 4])
    );


    it('failure - Maybe', () =>

        expect(

            mcompose(square, dec)([1])

        ).toEqual([])
    );


    it('failure - Either', () =>

        expect(

            mcompose(square, decE)([undefined, 1])

        ).toEqual(['decfailed', undefined])
    );


    it('use previous value - Either', () =>

        expect(

            mcompose(add, dec, dec)([4])

        ).toEqual([5])
    );


    it('use previous value - Maybe', () =>

        expect(

            mcompose(add, decE, decE)([undefined, 4])

        ).toEqual([undefined, 5])
    );


    it('failure at second step - Maybe', () =>

        expect(

            mcompose(add, dec, dec)([2])

        ).toEqual([])
    );


    it('failure at second step - Either', () =>

        expect(

            mcompose(add, decE, decE)([undefined, 2])

        ).toEqual(['decfailed', undefined])
    );


    it('pass success values to final function - Maybe', () =>

        expect(

            mcompose(add, mVal(3), mVal(3))([0])

        ).toEqual([6])
    );


    it('pass success values to final function - Either', () =>

        expect(

            mcompose(add, eVal(3), eVal(3))([undefined, 0])

        ).toEqual([undefined, 6])
    );


    it('get all intermediate values, youngest first - Maybe', () =>

        expect(

            mcompose(midentity, dec, dec)([3])

        ).toEqual([[1, 2, 3]])
    );


    it('get all intermediate values, youngest first - Either', () =>

        expect(

            mcompose(midentity, decE, decE)([undefined, 3])

        ).toEqual([undefined, [1, 2, 3]])
    );


    it('dont even start - Maybe', () =>

        expect(

            mcompose(add, safediv(3), dec)([])

        ).toEqual([])
    );


    it('dont even start - Either', () =>

        expect(

            mcompose(add, safedivE(3), decE)(['didntstart', undefined])

        ).toEqual(['didntstart', undefined])
    );


    it('dont get to savediv - Maybe', () =>

        expect(

            mcompose(add, safediv(3), dec)([1])

        ).toEqual([])
    );


    it('dont get to savediv - Either', () =>

        expect(

            mcompose(add, safedivE(3), decE)([undefined, 1])

        ).toEqual(['decfailed', undefined])
    );


    it('(3 / 0) - Maybe', () =>

        expect(

            mcompose(identity, safediv(3), zero)([6])

        ).toEqual([])
    );


    it('(3 / 0) - Either', () =>

        expect(

            mcompose(identity, safedivE(3), zeroE)([undefined, 6])

        ).toEqual(['safedivfail', undefined])
    );


    it('(3 / 2)^2 - Maybe', () =>

        expect(

            mcompose(square, safediv(6), dec)([2])

        ).toEqual([36])
    );


    it('(3 / 2)^2 - Either', () =>

        expect(

            mcompose(square, safedivE(6), decE)([undefined, 2])

        ).toEqual([undefined, 36])
    );


    it('use with flow - Maybe', () =>

        expect(

            flow(
                [3, 0, 4, 2],
                map(toMaybe),
                map(
                    mcompose(
                        square,
                        mlift(cond(lessThan(2), throws('')) as any),
                        safediv(6))),
                filter(isSuccess as any),
                map(getValue))

        ).toEqual([4, 9])
    );


    it('use with flow - Either', () =>

        expect(

            flow(
                [3, 0, 4, 2],
                map(toEither),
                map(
                    mcompose(
                        square,
                        elift(cond(lessThan(2), throws('e1')) as any),
                        safedivE(6))),
                filter(isSuccess as any),
                map(getValue))

        ).toEqual([4, 9])
    );
});