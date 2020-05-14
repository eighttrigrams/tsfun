import {lessThan} from '../../src/comparator'
import {dropWhile} from '../../src/array'


/**
 * tsfun | dropWhile
 */
describe('dropWhile', () => {

    it('dropWhile', () => {

        expect(dropWhile(lessThan(20))([7, 9, 10, 13, 21, 20])).toEqual([21, 20])
        expect(dropWhile(lessThan(20), [7, 9, 10, 13, 21, 20])).toEqual([21, 20])
    })


    it('drop none', () =>

        expect(

            dropWhile(lessThan(5))
            ([7, 9, 10, 13, 21, 20])

        ).toEqual([7, 9, 10, 13, 21, 20])
    )


    it('empty', () =>

        expect(

            dropWhile(lessThan(20))
            ([])

        ).toEqual([])
    )
})
