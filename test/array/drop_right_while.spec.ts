import {greaterThan, lessThan} from '../../src/comparator'
import {dropRightWhile} from '../../src/array'


/**
 * tsfun | dropRightWhile
 */
describe('dropRightWhile', () => {

    it('dropRightWhile', () => {

        expect(dropRightWhile(greaterThan(19))([13, 21, 20])).toEqual([13])
        expect(dropRightWhile(greaterThan(19), [13, 21, 20])).toEqual([13])
    })


    it('none', () =>

        expect(

            dropRightWhile(lessThan(19))
            ([13, 21, 20])

        ).toEqual([13, 21, 20])
    )


    it('all', () =>

        expect(

            dropRightWhile(greaterThan(1))
            ([13, 21, 20])

        ).toEqual([])
    )


    it('of empty', () =>

        expect(

            dropRightWhile(greaterThan(1))
            ([])

        ).toEqual([])
    )
})
