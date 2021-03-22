import {any} from '../../src/associative'
import {greaterThan} from '../../src/comparator'

/**
 * tsfun | any
 */
describe('any', () => {

    it('true', () =>
        expect(

            any(greaterThan(3))([4, 3])

        ).toEqual(true)
    )


    it('false', () =>
        expect(

            any(greaterThan(3))([1, 2])

        ).toEqual(false)
    )
})
