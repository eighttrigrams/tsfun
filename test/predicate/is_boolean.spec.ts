import {isBoolean} from '../../src/predicate'


/**
 * tsfun | isBoolean
 */
describe('isBoolean', () => {

    it('true', () =>
        expect(

            isBoolean(false))

            .toEqual(true))


    it('false', () =>
        expect(

            isBoolean(3))

            .toEqual(false))
})
