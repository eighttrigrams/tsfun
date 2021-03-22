import {greaterOrEqualThan} from '../../../src/comparator'


/**
 * tsfun | greaterOrEqualThan
 */
describe('greaterOrEqualThan', () => {

    it('true', () =>

        expect(

            greaterOrEqualThan(3)(4)

        ).toEqual(true)
    )

    it('equal', () =>

        expect(

            greaterOrEqualThan(4)(4)

        ).toEqual(true)
    )


    it('false', () =>

        expect(

            greaterOrEqualThan(4)(3)

        ).toEqual(false)
    )
})
