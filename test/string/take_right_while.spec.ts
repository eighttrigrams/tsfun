import {greaterThan} from '../../src/comparator'
import {takeRightWhile} from '../../src/string'


/**
 * tsfun/string | takeRightWhile
 */
describe('string/takeRightWhile', () => {

    it('string', () =>

        expect(

            takeRightWhile(greaterThan('a'))('abcdabbbe')

        ).toEqual('bbbe')
    )
})
