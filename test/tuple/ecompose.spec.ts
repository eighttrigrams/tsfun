import {mcompose, elift, eVal, getValue, midentity, toEither} from '../../src/tuple';
import {Either, Maybe} from '../../src/type';
import {identity} from '../../src/core';
import {cond, flow, throws} from '../../src/composition';
import {map} from '../../src/associative';
import {lessThan} from '../../src/comparator';
import {filter} from '../../src/collection';
import {isSuccess} from '../../src/predicate';


/**
 * tsfun | mcompose for either
 * monadic compose function
 *
 * @author Daniel de Oliveira
 */
describe('mcompose - either', () => {

    const zero = (_: any) => [undefined, 0] as Either<string, number>;
    const dec = (x: number) => (x-1 === 0 ? ['decfailed', undefined] : [undefined, x-1]) as Either<string, number>;
    const safediv = (x: number) => (y: number) => (y === 0 ? ['safedivfail', undefined] : [undefined, x / y]) as Either<string, number>;
    const add = (x: number, y: number) => x + y;
    const square = (x: number) => x * x;


    it('success', () =>

        expect(

            mcompose(square, dec)([undefined, 3])

        ).toEqual([undefined, 4])
    );


    it('failure', () =>

        expect(

            mcompose(square, dec)([undefined, 1])

        ).toEqual(['decfailed', undefined])
    );


    it('use previous value', () =>

        expect(

            mcompose(add, dec, dec)([undefined, 4])

        ).toEqual([undefined, 5])
    );


    it('failure at second step', () =>

        expect(

            mcompose(add, dec, dec)([undefined, 2])

        ).toEqual(['decfailed', undefined])
    );


    it('pass success values to final function', () =>

        expect(

            mcompose(add, eVal(3), eVal(3))([undefined, 0])

        ).toEqual([undefined, 6])
    );


    it('get all intermediate values, youngest first', () =>

        expect(

            mcompose(midentity, dec, dec)([undefined, 3])

        ).toEqual([undefined, [1, 2, 3]])
    );


    it('dont even start', () =>

        expect(

            mcompose(add, safediv(3), dec)(['didntstart', undefined])

        ).toEqual(['didntstart', undefined])
    );


    it('dont get to savediv', () =>

        expect(

            mcompose(add, safediv(3), dec)([undefined, 1])

        ).toEqual(['decfailed', undefined])
    );


    it('(3 / 0)', () =>

        expect(

            mcompose(identity, safediv(3), zero)([undefined, 6])

        ).toEqual(['safedivfail', undefined])
    );


    it('(3 / 2)^2', () =>

        expect(

            mcompose(square, safediv(6), dec)([undefined, 2])

        ).toEqual([undefined, 36])
    );


    it('use with flow', () =>

        expect(

            flow(
                [3, 0, 4, 2],
                map(toEither),
                map(
                    mcompose(
                        square,
                        elift(cond(lessThan(2), throws('e1')) as any),
                        safediv(6))),
                filter(isSuccess as any),
                map(getValue))

        ).toEqual([4, 9])
    );
});