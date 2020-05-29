import {append} from '../../../src/list'


/**
 * tsfun | list/append
 */
describe('listAppend', () => {

    it('append', () =>

        expect(

            append(1, 2)([3, 4])

        ).toEqual([3, 4, 1, 2]))


    it('string', () =>

        expect(

            append('ab', 'cde')('mno')

        ).toEqual('mnoabcde'))
})
