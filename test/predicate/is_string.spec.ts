import {isString} from '../../src/predicate'


/**
 * tsfun | isString
 */
describe('isString', () => {

    it('true',() =>
        expect(

            isString('abc'))

            .toEqual(true))


    it('false',() =>
        expect(

            isString(3))

            .toEqual(false))
})
