import {gt, lt} from '../../src/comparator'
import {dropRightWhile} from '../../src/array'


/**
 * tsfun | dropRightWhile
 */
describe('dropRightWhile', () => {

    it('dropRightWhile', () => {

        expect(dropRightWhile(gt(19))([13, 21, 20])).toEqual([13])
        expect(dropRightWhile(gt(19), [13, 21, 20])).toEqual([13])
    })


    it('none', () =>

        expect(

            dropRightWhile(lt(19))
            ([13, 21, 20])

        ).toEqual([13, 21, 20])
    )


    it('all', () =>

        expect(

            dropRightWhile(gt(1))
            ([13, 21, 20])

        ).toEqual([])
    )


    it('of empty', () =>

        expect(

            dropRightWhile(gt(1))
            ([])

        ).toEqual([])
    )
})
