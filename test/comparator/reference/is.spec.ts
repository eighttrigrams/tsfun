import {is} from '../../../src/comparator'


/**
 * tsfun | is
 */
describe('is', () => {


    it('is', () =>
        expect(

            is('a')('a'))

            .toEqual(true))
})
