import {greaterThan, lessThan} from '../../src/comparator';
import {takeWhile} from '../../src/list';


/**
 * tsfun | takeWhile
 */
describe('takeWhile', () => {

    it('take five', () => {

        expect(takeWhile(lessThan(20))([7, 9, 10, 13, 17, 20])).toEqual([7, 9, 10, 13, 17])
        expect(takeWhile(lessThan(20), [7, 9, 10, 13, 17, 20])).toEqual([7, 9, 10, 13, 17])
    })


    it('take none', () =>

        expect(

            takeWhile(greaterThan(23))
            ([7, 9, 10, 13, 17, 20])

        ).toEqual([])
    )


    it('take all', () =>

        expect(

            takeWhile(greaterThan(1))
            ([7, 9])

        ).toEqual([7, 9])
    )


    it('empty', () =>

        expect(

            takeWhile(greaterThan(23))([])

        ).toEqual([])
    )


    it('string', () =>

        expect(

            takeWhile(greaterThan('a'))('ddeaf')

        ).toEqual('dde')
    )


    it('typing', () => {

        const result1: number[] = takeWhile((_: number) => _ > 3)([3])
        // const result: string[] = takeWhile((_: number) => _ > 3)([3]) // WRONG
        const result2: string[] = takeWhile((_: string) => true)(['a']) as string[] // of string[]|string
        // const result2: string[] = takeWhile((_: string) => true)(['a']) as number[] // WRONG, because not of of string[]|string
        // const result: number[] = takeWhile((_: string) => true)([3]) // WRONG
        const result3: string = takeWhile((_: string) => true)('abc') as string // of string[]|string
        // const result: number = takeWhile((_: string) => true)('abc') as number
        // const result_: number[] = takeWhile((_: number) => true)('abc') // WRONG
        // const result: number[] = takeWhile((_: string) => true)([3]) // WRONG
    })
})
