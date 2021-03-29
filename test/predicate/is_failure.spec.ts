import {isFailure} from '../../src/predicate'


/**
 * tsfun | isFailure
 */
describe('isFailure', () => {

    it('isFailure - Maybe - false', () =>

        expect(

            isFailure([1])

        ).toEqual(false)
    )


    it('isFailure - Maybe - true', () =>

        expect(

            isFailure([])

        ).toEqual(true)
    )


    it('isFailure - Either - false', () =>

        expect(

            isFailure([undefined, 1])

        ).toEqual(false)
    )


    it('isFailure - Either - true', () =>

        expect(

            isFailure([1, undefined])

        ).toEqual(true)
    )
})
