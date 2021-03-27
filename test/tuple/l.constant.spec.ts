import {L, R} from '../../src/tuple'
import {is, on} from '../../src/comparator'

/**
 * tsfun | LEFT
 */
describe('LEFT', () => {

    it('LEFT', () =>
        expect(

            on(L, is(4))([4, 1])

        ).toEqual(true))


    it('LEFT - nested', () =>
        expect(

            on([L, R], is(7))([[3, 7], 14])

        ).toEqual(true))
})
