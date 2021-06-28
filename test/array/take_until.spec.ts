import {takeUntil} from '../../src/array'
import {gt} from '../../src/comparator'


/**
 * tsfun | takeUntil
 */
describe('takeUntil', () => {

    it('takeUntil - take two', () => {

        expect(

            takeUntil(gt(7))
            ([7, 9, 11])

        ).toEqual([7, 9])
    })


    it('takeUntil - take all', () =>

        expect(

            takeUntil(gt(13))
            ([7, 9, 11])

        ).toEqual([7, 9, 11])
    )


    it('takeUntil - empty', () =>

        expect(

            takeUntil(gt(13))
            ([])

        ).toEqual([])
    )
})
