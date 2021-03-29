import {isUndefined} from '../../src/predicate'


/**
 * tsfun | isUndefined
 */
describe('isUndefined', () => {

    it('isFalse',() =>
        expect(

            isUndefined(undefined))

            .toEqual(true))
})
