import {append} from '../../../src/string'


/**
 * tsfun/append | append
 */
describe('stringAppend', () => {

    it('string', () =>

        expect(

            append('ab', 'cde')('mno')

        ).toEqual('mnoabcde'))
})
