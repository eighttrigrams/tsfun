import {gte} from '../../../src/comparator'


/**
 * tsfun | gte
 */
describe('gte', () => {

    it('true', () =>

        expect(

            gte(3)(4)

        ).toEqual(true)
    )

    it('equal', () =>

        expect(

            gte(4)(4)

        ).toEqual(true)
    )


    it('false', () =>

        expect(

            gte(4)(3)

        ).toEqual(false)
    )
})
