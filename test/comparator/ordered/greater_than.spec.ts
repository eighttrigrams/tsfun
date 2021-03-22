import {greaterThan} from '../../../src/comparator'


/**
 * tsfun | greaterThan
 */
describe('greaterThan', () => {

   it('true', () =>

       expect(

           greaterThan(3)(4)

       ).toEqual(true)
   )


    it('false', () =>

        expect(

            greaterThan(4)(3)

        ).toEqual(false)
    )
})
