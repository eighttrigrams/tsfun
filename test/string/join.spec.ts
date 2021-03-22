import {join} from '../../src/string'


/**
 * tsfun/string | join
 */
describe('string/join', () => {

    it('join', () =>
        expect(

            join('')(['a', 'b', 'c'])

        ).toEqual('abc'))
})
