import {mcompose as asyncMcompose, flow as asyncFlow} from '../../src/async';
import {Either, Maybe} from '../../src/type';


/**
 * tsfun | async/mcompose
 * @author Daniel de Oliveira
 */
describe('async/mcompose', () => {

    const decM = async (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>;
    const syncDecM = (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>;
    const decE = async (x: number) => (x-1 === 0 ? ['decfailed', undefined] : [undefined, x-1]) as Either<string, number>;
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
});
