import {is, on} from '../../src/comparator'
import {FIRST} from '../../src/list'

/**
 * tsfun | FIRST
 */
describe('FIRST', () => {

    it('FIRST', () =>
        expect(

            on(FIRST, is(4))([4, 1])

        ).toEqual(true))


    it('FIRST - nested', () =>
        expect(

            on([FIRST, FIRST], is(3))([[3, 7], 14])

        ).toEqual(true))
})
