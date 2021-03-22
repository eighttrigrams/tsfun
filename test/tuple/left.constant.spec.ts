import {LEFT, RIGHT} from '../../src/tuple'
import {is, on} from '../../src/comparator'

/**
 * tsfun | LEFT
 */
describe('LEFT', () => {

    it('LEFT', () =>
        expect(

            on(LEFT, is(4))([4, 1])

        ).toEqual(true))


    it('LEFT - nested', () =>
        expect(

            on([LEFT, RIGHT], is(7))([[3, 7], 14])

        ).toEqual(true))
})
