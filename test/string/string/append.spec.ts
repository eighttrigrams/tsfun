import {append} from '../../../src/string'


/**
 * tsfun | string/append
 */
describe('stringAppend', () => {

    it('string', () =>

        expect(

            append('ab', 'cde')('mno')

        ).toEqual('mnoabcde'))
})
