import {toUpperCase} from '../../src/string'

/**
 * tsfun/string | toUpperCase
 */
describe('string/toUpperCase', () => {

    it('toUpperCase', () =>
        expect(

            toUpperCase('abc')

        ).toEqual('ABC'))
})
