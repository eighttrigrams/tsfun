import {ecompose, elift, eVal, fromESuccess, midentity, toEither} from '../../src/tuple';
import {Either} from '../../src/type';
import {identity} from '../../src/core';
import {cond, flow, throws} from '../../src/composition';
import {map} from '../../src/associative';
import {lessThan} from '../../src/comparator';
import {filter} from '../../src/collection';
import {isSuccess} from '../../src/predicate';


/**
 * tsfun | ecompose
 * monadic compose function
 *
 * @author Daniel de Oliveira
 */
describe('ecompose', () => {

    const zero = (_: any) => [undefined, 0] as Either<string, number>;
    const dec = (x: number) => (x-1 === 0 ? ['decfailed', undefined] : [undefined, x-1]) as Either<string, number>;
    const safediv = (x: number) => (y: number) => (y === 0 ? ['safedivfail', undefined] : [undefined, x / y]) as Either<string, number>;
    const add = (x: number, y: number) => x + y;
    const square = (x: number) => x * x;


    it('success', () =>

        expect(

            ecompose(square, dec)([undefined, 3])

        ).toEqual([undefined, 4])
    );


    it('failure', () =>

        expect(

            ecompose(square, dec)([undefined, 1])

        ).toEqual(['decfailed', undefined])
    );


    it('use previous value', () =>

        expect(

            ecompose(add, dec, dec)([undefined, 4])

        ).toEqual([undefined, 5])
    );


    it('failure at second step', () =>

        expect(

            ecompose(add, dec, dec)([undefined, 2])

        ).toEqual(['decfailed', undefined])
    );


    it('pass success values to final function', () =>

        expect(

            ecompose(add, eVal(3), eVal(3))([undefined, 0])

        ).toEqual([undefined, 6])
    );


    it('get all intermediate values, youngest first', () =>

        expect(

            ecompose(midentity, dec, dec)([undefined, 3])

        ).toEqual([undefined, [1, 2, 3]])
    );


    it('dont even start', () =>

        expect(

            ecompose(add, safediv(3), dec)(['didntstart', undefined])

        ).toEqual(['didntstart', undefined])
    );


    it('dont get to savediv', () =>

        expect(

            ecompose(add, safediv(3), dec)([undefined, 1])

        ).toEqual(['decfailed', undefined])
    );


    it('(3 / 0)', () =>

        expect(

            ecompose(identity, safediv(3), zero)([undefined, 6])

        ).toEqual(['safedivfail', undefined])
    );


    it('(3 / 2)^2', () =>

        expect(

            ecompose(square, safediv(6), dec)([undefined, 2])

        ).toEqual([undefined, 36])
    );


    it('use with flow', () =>

        expect(

            flow(
                [3, 0, 4, 2],
                map(toEither),
                map(
                    ecompose(
                        square,
                        elift(cond(lessThan(2), throws('e1')) as any),
                        safediv(6))),
                filter(isSuccess as any),
                map(fromESuccess))

        ).toEqual([4, 9])
    );
});