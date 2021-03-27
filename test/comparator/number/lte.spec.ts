import {lte} from '../../../src/comparator'


/**
 * tsfun | lte
 */
describe('lte', () => {

    it('false', () =>

        expect(

            lte(3)(4)

        ).toEqual(false)
    );

    it('equal', () =>

        expect(

            lte(4)(4)

        ).toEqual(true)
    );


    it('true', () =>

        expect(

            lte(4)(3)

        ).toEqual(true)
    )
})
