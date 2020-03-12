import {flow as asyncFlow, map as asyncMap, mcompose as asyncMcompose} from '../../src/async';
import {Either, Maybe} from '../../src/type';
import {either, left, right} from '../../src/tuple';
import {map, update} from '../../src/associative';
import {isSuccess} from '../../src/predicate';
import {separate} from '../../src/collection';


/**
 * tsfun | async/mcompose
 *
 * @author Daniel de Oliveira
 */
describe('async/mcompose', () => {

    const decM = async (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>;
    const syncDecM = (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>;
    const decE = async (x: number) => (x-1 === 0 ? ['decfailed', undefined] : [undefined, x-1]) as Either<string, number>;
    const safedivE = (x: number) => async (y: number) => (y === 0 ? ['safedivfail', undefined] : [undefined, x / y]) as Either<string, number>;
    const square = async (x: number) => x * x;
    const syncSquare = (x: number) => x * x;

    it('success - Maybe', async () =>

        expect(

            await asyncMcompose(square, decM)([3])

        ).toEqual([4])
    );


    it('success - Maybe - with synchronous square function', async () =>

        expect(

            await asyncMcompose(syncSquare, decM)([3])

        ).toEqual([4])
    );


    it('success - Maybe - with synchronous decM function', async () =>

        expect(

            await asyncMcompose(syncSquare, syncDecM)([3])

        ).toEqual([4])
    );


    it('success - Either', async () =>

        expect(

            await asyncMcompose(square, decE)([undefined, 3])

        ).toEqual([undefined, 4])
    );


    it('failure - Maybe', async () =>

        expect(

            await asyncMcompose(square, decM)([1])

        ).toEqual([])
    );


    it('failure - Either', async () =>

        expect(

            await asyncMcompose(square, decE)([undefined, 1])

        ).toEqual(['decfailed', undefined])
    );


    it('use with asyncFlow', async () =>

        expect(

            await asyncFlow(
                [1],
                asyncMcompose(square, decM))

        ).toEqual([])
    );


    it('use case', async () =>

        expect(
            await asyncFlow(
                [0, 3, 1],
                map(either),
                asyncMap(asyncMcompose(square, decE, safedivE(3))),
                separate(isSuccess),
                update(0, map(right)),
                update(1, map(left)))

        ).toEqual([
            [4],
            ['safedivfail', 'decfailed']
        ])
    );
});
