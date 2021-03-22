import {isnt} from '../../../src/comparator'


/**
 * tsfun | isnt
 */
describe('isnt', () => {

    it('isnt', () =>
        expect(

            isnt('a')('a'))

            .toEqual(false))
})
