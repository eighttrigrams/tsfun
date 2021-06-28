import {isOk} from '../../src/predicate'


/**
 * tsfun | isOk
 */
describe('isOk', () => {

    it('isOk - Maybe - true', () =>

        expect(

            isOk([1])

        ).toEqual(true)
    )


    it('isOk - Maybe - false', () =>

        expect(

            isOk([])

        ).toEqual(false)
    )


    it('isOk - Either - true', () =>

        expect(

            isOk([undefined, 1])

        ).toEqual(true)
    )


    it('isOk - Either - false', () =>

        expect(

            isOk([1, undefined])

        ).toEqual(false)
    )
})
