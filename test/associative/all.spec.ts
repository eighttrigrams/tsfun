import {all} from '../../src/associative'
import {gt} from '../../src/comparator'

/**
 * tsfun | all
 */
describe('all', () => {

    it('true', () =>
        expect(

            all(gt(3))([4, 5, 6])

        ).toEqual(true)
    )


    it('false', () =>
        expect(

            all(gt(3))([3, 4, 5, 6])

        ).toEqual(false)
    )
})

