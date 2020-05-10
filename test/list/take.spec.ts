import {take} from '../../src/list';


/**
 * tsfun | take
 *
 * Takes a number of items from a List and returns a List of the same type.
 *
 * takes operates on the List abstraction over Arrays and strings.
 *
 * It can be used in a flow context, where the arguments are given as separate argument lists,
 * as well as in a standard context, where the arguments are given in a single argument list.
 */
describe('take', () => {

    it('5', () => {

        expect(take(5)([1, 2, 7, 7, 8, 9, 11])).toEqual([1, 2, 7, 7, 8])
        expect(take(5, [1, 2, 7, 7, 8, 9, 11])).toEqual([1, 2, 7, 7, 8])
    });


    it('string', () => {

        expect(take(4)('sosos')).toEqual('soso')
        expect(take(4, 'sosos')).toEqual('soso')
    });


    it('0', () =>

        expect(

            take(0)
            ([1, 2, 7, 7, 8, 9, 11])

        ).toEqual([])
    );


    it('more', () =>

        expect(

            take(3)
            ([1, 2])

        ).toEqual([1, 2])
    );


    it('from empty', () =>

        expect(

            take(3)
            ([])

        ).toEqual([])
    );


    it('negative n', () =>

        expect(

            take(-1)
            ([1, 2])

        ).toEqual([])
    );


    it('string - from empty', () =>

        expect(

            take(4)
            ('')

        ).toEqual('')
    );


    it('typing', () => {

        const result1: Array<number> = take(5)([1, 2, 7, 7, 8, 9, 11])
        const result2: Array<number> = take(5, [1, 2, 7, 7, 8, 9, 11])
        // WRONG - const result: Array<number> = take(5) - second parameter list expected, to give Array<number>

        // WRONG - const result: string= take(5, [1, 2, 7, 7, 8, 9, 11]) - types do not match
        // WRONG - const result: Array<string> = take(5)([1, 2, 7, 7, 8, 9, 11]) - Array types do not match

        const result3: string = take(5)("abc")
    });
});
