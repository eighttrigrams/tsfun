import {greaterThan} from '../../../src/comparator';
import {takeWhile} from '../../../src/string';


/**
 * tsfun/string | takeWhile
 */
describe('string/takeWhile', () => {

    it('string', () =>

        expect(

            takeWhile(greaterThan('a'))('ddeaf')

        ).toEqual('dde')
    )


    it('typing', () => {

        // REMOVE const result1: number[] = takeWhile((_: number) => _ > 3)([3])

        // const result: string[] = takeWhile((_: number) => _ > 3)([3]) // WRONG
        const result2: string[] = takeWhile((_: string) => true)(['a']) as string[] // of string[]|string
        // const result2: string[] = takeWhile((_: string) => true)(['a']) as number[] // WRONG, because not of of string[]|string
        // const result: number[] = takeWhile((_: string) => true)([3]) // WRONG
        const result3: string = takeWhile((_: string) => true)('abc') as string // of string[]|string
        // const result: number = takeWhile((_: string) => true)('abc') as number
        // const result_: number[] = takeWhile((_: number) => true)('abc') // WRONG
        // const result: number[] = takeWhile((_: string) => true)([3]) // WRONG

        const result4 = takeWhile((_: string) => true)(['']) as string
        const result5 = takeWhile((_: string) => true)('') as string
        // const result = takeWhile((_: number) => true)(['']) as number[]
        // const result = takeWhile((_: number) => true)('') as number[]
        // const result = takeWhile((_: string) => true)('') as number[]

        // REMOVE const result6 = takeWhile((_: number) => true)([3]) as number[]

        // const result = takeWhile((_: number) => true)([3]) as string // WRONG
    })
})
