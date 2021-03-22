import {lessThan} from '../../../src/comparator'


/**
 * tsfun | lessThan
 */
describe('lessThan', () => {

    it('false', () =>

        expect(

            lessThan(3)(4)

        ).toEqual(false)
    )


    it('true', () =>

        expect(

            lessThan(4)(3)

        ).toEqual(true)
    )
})
