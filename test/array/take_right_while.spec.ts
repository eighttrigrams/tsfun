import {gt} from '../../src/comparator'
import {takeRightWhile} from '../../src/array'


/**
 * tsfun | takeRightWhile
 */
describe('takeRightWhile', () => {

    it('take five', () =>

        expect(

            takeRightWhile(gt(13))
            ([7, 9, 10, 13, 17, 20])

        ).toEqual([17, 20])
    )


    it('take none', () =>

        expect(

            takeRightWhile(gt(23))
            ([7, 9, 10, 13, 17, 20])

        ).toEqual([])
    )


    it('take all', () =>

        expect(

            takeRightWhile(gt(1))
            ([7, 9])

        ).toEqual([7, 9])
    )


    it('empty', () =>

        expect(

            takeRightWhile(gt(23))
            ([])

        ).toEqual([])
    )
})
