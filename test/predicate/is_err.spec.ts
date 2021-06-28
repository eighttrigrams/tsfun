import {isErr} from '../../src/predicate'


/**
 * tsfun | isErr
 */
describe('isErr', () => {

    it('isErr - Maybe - false', () =>

        expect(

            isErr([1])

        ).toEqual(false)
    )


    it('isErr - Maybe - true', () =>

        expect(

            isErr([])

        ).toEqual(true)
    )


    it('isErr - Either - false', () =>

        expect(

            isErr([undefined, 1])

        ).toEqual(false)
    )


    it('isErr - Either - true', () =>

        expect(

            isErr([1, undefined])

        ).toEqual(true)
    )
})
