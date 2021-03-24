import {liftE, getSuccess, liftM, success, just, right, left} from '../../src/tuple'
import {Either, Mapping, Maybe} from '../../src/type'
import {collect, cond, flow, mcompose, throws, val} from '../../src/composition'
import {map, filter, update_a, $separate} from '../../src/associative'
import {isSuccess} from '../../src/predicate'
import {lessThan} from '../../src/comparator'


/**
 * tsfun | mcompose
 * monadic compose function
 */
describe('mcompose', () => {

    const zero = (_: any) => [0] as Maybe<number>
    const zeroE = (_: any) => [undefined, 0] as Either<string, number>
    const decM = (x: number) => (x-1 === 0 ? [] : [x-1]) as Maybe<number>
    const decE = (x: number) => (x-1 === 0 ? ['decfailed', undefined] : [undefined, x-1]) as Either<string, number>
    const safedivM = (x: number) => (y: number) => (y === 0 ? [] : [x / y]) as Maybe<number>
    const safedivE = (x: number) => (y: number) => (y === 0 ? ['safedivfail', undefined] : [undefined, x / y]) as Either<string, number>
    const add = (x: number, y: number) => x + y
    const square = (x: number) => x * x
    const squareE = liftE(square)
    const squareM = liftM(square)


    it('success - Maybe', () =>

        expect(

            mcompose(decM, squareM)
            ([3])

        ).toEqual([4])
    )


    it('success - Either', () =>

        expect(

            mcompose(decE, squareE)
            ([undefined, 3])

        ).toEqual([undefined, 4])
    )


    it('failure - Maybe', () =>

        expect(

            mcompose(decM, squareM)
            ([1])

        ).toEqual([])
    )


    it('failure - Either', () =>

        expect(

            mcompose(decE, squareE)([undefined, 1])

        ).toEqual(['decfailed', undefined])
    )


    it('use previous value - Either', () =>

        expect(

            mcompose(decM, decM, liftM(add))([4])

        ).toEqual([5])
    )


    it('use previous value - Maybe', () =>

        expect(

            mcompose(decE, decE, liftE(add))([undefined, 4])

        ).toEqual([undefined, 5])
    )


    it('access previous value - Maybe', () =>

        expect(

            mcompose(decM, liftM((vZero: number, vMinus1: number) => vMinus1-vZero), liftM(add))
            ([4])

        ).toEqual([4])
    )


    it('access previous value - Either', () =>

        expect(

            mcompose(decE, liftE((vZero: number, vMinus1: number) => vMinus1-vZero), liftE(add))
            ([undefined, 4])

        ).toEqual([undefined, 4])
    )


    it('failure at second step - Maybe', () =>

        expect(

            mcompose(decM, decM, liftM(add))
            ([2])

        ).toEqual([])
    )


    it('failure at second step - Either', () =>

        expect(

            mcompose(decE, decE, liftE(add))
            ([undefined, 2])

        ).toEqual(['decfailed', undefined])
    )


    it('pass success values to final function - Maybe', () =>

        expect(

            mcompose(val([3]), val([3]), liftM(add))
            ([0])

        ).toEqual([6])
    )


    it('pass success values to final function - Either', () =>

        expect(

            mcompose(val([undefined, 3]), val([undefined, 3]),liftE(add))
            ([undefined, 0])

        ).toEqual([undefined, 6])
    )


    it('get all intermediate values, youngest first - Maybe', () =>

        expect(

            mcompose(decM, decM, liftM(collect as any)) // TODO review collect usage
            ([3])

        ).toEqual([[1, 2, 3]])
    )


    it('get all intermediate values, youngest first - Either', () =>

        expect(

            mcompose(decE, decE, liftE(collect as any)) // TODO review collect usage
            ([undefined, 3])

        ).toEqual([undefined, [1, 2, 3]])
    )


    it('dont even start - Maybe', () =>

        expect(

            mcompose(decM, safedivM(3), liftM(add))([])

        ).toEqual([])
    )


    it('dont even start - Either', () =>

        expect(

            mcompose(decE, safedivE(3), liftE(add))(['didntstart', undefined])

        ).toEqual(['didntstart', undefined])
    )


    it('dont get to savediv - Maybe', () =>

        expect(

            mcompose(decM, safedivM(3), liftM(add))
            ([1])

        ).toEqual([])
    )


    it('dont get to savediv - Either', () =>

        expect(

            mcompose(decE, safedivE(3), liftE(add))
            ([undefined, 1])

        ).toEqual(['decfailed', undefined])
    )


    it('(3 / 0) - Maybe', () =>

        expect(

            mcompose(zero, safedivM(3))
            ([6])

        ).toEqual([])
    )


    it('(3 / 0) - Either', () =>

        expect(

            mcompose(zeroE, safedivE(3))([undefined, 6])

        ).toEqual(['safedivfail', undefined])
    )


    it('(3 / 2)^2 - Maybe', () =>

        expect(

            mcompose(decM, safedivM(6), squareM)([2])

        ).toEqual([36])
    )


        it('(3 / 2)^2 - Either', () =>

            expect(

                mcompose(decE, safedivE(6), squareE)([undefined, 2])

            ).toEqual([undefined, 36])
        )


        it('use with flow - Maybe', () =>

            expect(

                flow(
                    [3, 0, 4, 2],
                    map(just),
                    map(
                        mcompose(
                            safedivM(6),
                            liftM(cond(lessThan(2), throws('')) as any),
                            liftM(square))),
                    filter(isSuccess as any),
                    map(getSuccess))

            ).toEqual([4, 9])
        )


        it('use with flow - Either', () =>

            expect(

                flow(
                    [3, 0, 4, 2],
                    map(success),
                    map(
                        mcompose(
                            safedivE(6),
                            liftE(cond(lessThan(2), throws('e1')) as any),
                            squareE)),
                    filter(isSuccess as any),
                    map(getSuccess))

            ).toEqual([4, 9])
        )


        it('use case', () =>

            expect(
                flow(
                    [0, 3, 1],
                    map(success),
                    map(mcompose(safedivE(3), decE, squareE)),
                    $separate(isSuccess),
                    update_a(0, map(right) as Mapping),
                    update_a(1, map(left) as Mapping))

            ).toEqual([
                [4],
                ['safedivfail', 'decfailed']
            ])
        )
})
