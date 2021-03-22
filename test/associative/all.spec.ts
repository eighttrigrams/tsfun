import {all} from '../../src/associative'
import {greaterThan} from '../../src/comparator'

/**
 * tsfun | all
 */
describe('all', () => {

    it('true', () =>
        expect(

            all(greaterThan(3))([4, 5, 6])

        ).toEqual(true)
    )


    it('false', () =>
        expect(

            all(greaterThan(3))([3, 4, 5, 6])

        ).toEqual(false)
    )
})

