import {any} from '../../src/associative'
import {gt} from '../../src/comparator'

/**
 * tsfun | any
 */
describe('any', () => {

    it('true', () =>
        expect(

            any(gt(3))([4, 3])

        ).toEqual(true)
    )


    it('false', () =>
        expect(

            any(gt(3))([1, 2])

        ).toEqual(false)
    )
})
