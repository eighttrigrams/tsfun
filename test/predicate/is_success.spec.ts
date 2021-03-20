import {isSuccess} from '../../src/predicate'


/**
 * tsfun | isSuccess
 */
describe('isSuccess', () => {

    it('isSuccess - Maybe - true', () =>

        expect(

            isSuccess([1])

        ).toEqual(true)
    )


    it('isSuccess - Maybe - false', () =>

        expect(

            isSuccess([])

        ).toEqual(false)
    )


    it('isSuccess - Either - true', () =>

        expect(

            isSuccess([undefined, 1])

        ).toEqual(true)
    )


    it('isSuccess - Either - false', () =>

        expect(

            isSuccess([1, undefined])

        ).toEqual(false)
    )
})
