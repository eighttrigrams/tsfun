import {lessOrEqualThan} from '../../../src/comparator'


/**
 * tsfun | lessOrEqualThan
 */
describe('lessOrEqualThan', () => {

    it('false', () =>

        expect(

            lessOrEqualThan(3)(4)

        ).toEqual(false)
    );

    it('equal', () =>

        expect(

            lessOrEqualThan(4)(4)

        ).toEqual(true)
    );


    it('true', () =>

        expect(

            lessOrEqualThan(4)(3)

        ).toEqual(true)
    )
})
