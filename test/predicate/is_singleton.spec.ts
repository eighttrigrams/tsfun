import {isSingleton} from '../../src/predicate'


/**
 * tsfun | isSingleton
 */
describe('isSingleton', () => {

    it('true', () =>
        expect(

            isSingleton(['1'])

        ).toEqual(true)
    )


    it('true', () =>
        expect(

            isSingleton(['1', 2])

        ).toEqual(false)
    )
})
