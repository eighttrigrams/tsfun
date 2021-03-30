import {aFlow, aMap, aMcompose} from '../../src/async'
import {Either, Mapping, Maybe} from '../../src/type'
import {success, left, right, L, R} from '../../src/tuple'
import {map, assoc} from '../../src/associative'
import {separate} from '../../src/array'
import {isSuccess} from '../../src/predicate'


/**
 * tsfun | aMcompose
 */
describe('aMcompose', () => {

    const decM = async (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>
    const syncDecM = (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>
    const decE = async (x: number) => (x-1 === 0 ? ['decfailed', undefined] : [undefined, x-1]) as Either<string, number>
    const safedivE = (x: number) => async (y: number) => (y === 0 ? ['safedivfail', undefined] : [undefined, x / y]) as Either<string, number>
    const squareM = async (x: number): Promise<Maybe<number>> => [x * x]
    const squareE = async (x: number): Promise<Either<any, number>> => [undefined, x * x]
    const syncSquareM = (x: number): Maybe<number> => [x * x]

    it('success - Maybe', async () =>

        expect(

            await aMcompose(decM, squareM)
            ([3])

        ).toEqual([4])
    )


    it('success - Maybe - with synchronous square function', async () =>

        expect(

            await aMcompose(decM, syncSquareM)
            ([3])

        ).toEqual([4])
    )


    it('success - Maybe - with synchronous decM function', async () =>

        expect(

            await aMcompose(syncDecM, syncSquareM)
            ([3])

        ).toEqual([4])
    )


    it('success - Either', async () =>

        expect(

            await aMcompose(decE, squareE)
            ([undefined, 3])

        ).toEqual([undefined, 4])
    )


    it('failure - Maybe', async () =>

        expect(

            await aMcompose(decM, squareM)
            ([1])

        ).toEqual([])
    )


    it('failure - Either', async () =>

        expect(

            await aMcompose(decE, squareE)
            ([undefined, 1])

        ).toEqual(['decfailed', undefined])
    )


    it('use with asyncFlow', async () =>

        expect(

            await aFlow(
                [1],
                aMcompose(decM, squareM))

        ).toEqual([])
    )


    it('use case', async () =>

        expect(
            await aFlow(
                [0, 3, 1],
                map(success),
                aMap(aMcompose(safedivE(3), decE, squareE)),
                separate(isSuccess),
                assoc(L, map(right) as Mapping),
                assoc(R, map(left) as Mapping))

        ).toEqual([
            [4],
            ['safedivfail', 'decfailed']
        ])
    )
})
