import {gt} from '../../../src/comparator'


/**
 * tsfun | gt
 */
describe('gt', () => {

   it('true', () =>

       expect(

           gt(3)(4)

       ).toEqual(true)
   )


    it('false', () =>

        expect(

            gt(4)(3)

        ).toEqual(false)
    )
})
