import {take} from '../../../src/string'


/**
 * tsfun/string | take
 *
 * Takes a number of items from a List and returns a List of the same type.
 *
 * takes operates on the List abstraction over Arrays and strings.
 *
 * It can be used in a flow context, where the arguments are given as separate argument lists,
 * as well as in a standard context, where the arguments are given in a single argument list.
 */
describe('string/take', () => {

    it('string', () => {

        expect(take(4)('sosos')).toEqual('soso')
        expect(take(4, 'sosos')).toEqual('soso')
    })


    it('string - from empty', () =>

        expect(

            take(4)
            ('')

        ).toEqual('')
    )


    it('typing', () => {

        // REMOVE const result: number[] = take(5) // WRONG - second parameter list expected, to give Array<number>

        // const result: string= take(5, [1, 2, 7, 7, 8, 9, 11]) // WRONG - types do not match
        // const result: Array<string> = take(5)([1, 2, 7, 7, 8, 9, 11]) // WRONG - Array types do not match

        const result3: string = take(5)('abc') as string
    })
})
