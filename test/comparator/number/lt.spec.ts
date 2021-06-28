import {lt} from '../../../src/comparator'


/**
 * tsfun | lt
 */
describe('lt', () => {

    it('false', () =>

        expect(

            lt(3)(4)

        ).toEqual(false)
    )


    it('true', () =>

        expect(

            lt(4)(3)

        ).toEqual(true)
    )
})
