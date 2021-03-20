import {equal, is, jsonEqual, on} from '../../src/comparator'
import {conds, condsBy, flow, otherwise} from '../../src/composition'
import {to} from '../../src/struct'

/**
 * tsfun | conds
 *       | + otherwise
 * 
 * As a replacement for switch-case in compositions.
 */
describe('conds', () => {

    const square = (x: number) => x * x


    it('test by precicate, result by value', () => {
        
        expect(
            conds(
                is(3), 5,
                is(5), 6)
            (3)
        ).toEqual(5)

        expect(
            conds(
                is(3), 5,
                is(5), 6)
            (5)
        ).toEqual(6)

        expect(
            conds(
                is(3), 5,
                is(5), 6,
                is(7), 17)
            (7)
        ).toEqual(17)

        expect(
            conds(
                is(3), 5,
                is(5), 6,
                is(7), 17,
                is(8), 18)
            (8)
        ).toEqual(18)

        expect(
            conds(
                is(3), 5,
                is(5), 6,
                is(7), 17,
                is(8), 18,
                is(9), 19)
            (9)
        ).toEqual(19)

        // group more than 5 conditions pairwise
        expect(
            conds(
                [is(3), 5],
                [is(5), 6],
                [is(7), 17],
                [is(8), 18],
                [is(9), 19],
                [is(10), 20])
            (10)
        ).toEqual(20)
    })


    it('test by value, result by value', () => {

        expect(
            conds(
                3, 5,
                5, 6)
            (3)
        ).toEqual(5)

        expect(
            conds(
                3, 5,
                5, 6)
            (5)
        ).toEqual(6)

        expect(
            conds(
                3, 5,
                5, 6,
                6, 16)
            (6)
        ).toEqual(16)

        expect(
            conds(
                3, 5,
                5, 6,
                6, 16,
                7, 17)
            (7)
        ).toEqual(17)

        expect(
            conds(
                3, 5,
                5, 6,
                6, 16,
                7, 17,
                8, 18)
            (8)
        ).toEqual(18)

        // group more than 5 conditions pairwise
        expect(
            conds(
                [3, 5],
                [5, 6],
                [6, 16],
                [7, 17],
                [8, 18],
                [9, 19])
            (9)
        ).toEqual(19)
    })


    it('test by value, result by mapping', () => {

        expect(
            conds(
                3, square,
                5, square)
            (3)
        ).toEqual(9)

        expect(
            conds(
                3, square,
                6, square)
            (6)
        ).toEqual(36)

        expect(
            conds(
                1, square,
                2, square,
                3, square)
            (3)
        ).toEqual(9)

        expect(
            conds(
                1, square,
                2, square,
                3, square,
                4, square)
            (4)
        ).toEqual(16)

        expect(
            conds(
                1, square,
                2, square,
                3, square,
                4, square,
                5, square)
            (5)
        ).toEqual(25)

        // group more than 5 conditions pairwise
        expect(
            conds(
                [1, square],
                [2, square],
                [3, square],
                [4, square],
                [5, square],
                [6, square])
            (6)
        ).toEqual(36)
    })


    it('test by predicate, result by mapping', () => {

        expect(
            conds(
                is(1), square,
                is(2), square)
            (1)
        ).toEqual(1)

        expect(
            conds(
                is(1), square,
                is(2), square)
            (2)
        ).toEqual(4)

        expect(
            conds(
                is(1), square,
                is(2), square,
                is(3), square)
            (3)
        ).toEqual(9)
        
        expect(
            conds(
                is(1), square,
                is(2), square,
                is(3), square,
                is(4), square)
            (4)
        ).toEqual(16)
        
        expect(
            conds(
                is(1), square,
                is(2), square,
                is(3), square,
                is(4), square,
                is(5), square)
            (5)
        ).toEqual(25)

        // group more than 5 conditions pairwise
        expect(
            conds(
                [is(1), square],
                [is(2), square],
                [is(3), square],
                [is(4), square],
                [is(5), square],
                [is(6), square])
            (6)
        ).toEqual(36)
    })


    it('otherwise', () => {

        expect(
            conds(
                    is(3), 5,
                    is(5), 6,
                    otherwise, 7)
                (8)
            ).toEqual(7)

        expect(
            conds(
                    3, 5,
                    3, 6,
                    otherwise, 7)
                (8)
            ).toEqual(7)
    })


    it('default', () =>
        expect(

            () => conds(
                is(3), 5,
                is(5), 6)
            (4)

        ).toThrow()
    )


    it('use case', () =>
        expect(

            flow(
                {a: 7}, 
                conds( // TODO review seleted overload, should be first, not third
                    on('a', is(7)), on('a', square as any), // TODO
                    jsonEqual({a: 7}), to('a')))

        ).toEqual(49)
    )


    it('condsBy', () => {

        // If one does not pass functions to the left-hand-sides,
        // and also does not want to compare by ===, one can 
        // construct conds with a comparator of choice

        const $conds = condsBy(equal);
      
        expect(
            $conds(
                    { a: 3 }, 5,
                    { a: 4 }, 6)
                ({ a: 3 })
            ).toEqual(5)

        expect(
            $conds(
                    { a: 3 }, to('a'),
                    { a: 4 }, to('a'),
                    { a: 5 }, to('a'))
                ({ a: 5 })
            ).toEqual(5)

        // When using it, avoid passing functions to the left hand side,
        // since this won't be ruled out by typechecking.
    })
})
