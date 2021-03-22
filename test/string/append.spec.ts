import {append} from '../../src/string'


/**
 * tsfun/string | append
 */
describe('string/append', () => {

    it('string', () =>

        expect(

            append('ab', 'cde')('mno')

        ).toEqual('mnoabcde'))
})
