import {toLowerCase} from '../../src/string'


/**
 * tsfun/string | toLowerCase
 */
describe('string/toLowerCase', () => {

    it('toLowerCase', () =>
        expect(

            toLowerCase('ABC')

        ).toEqual('abc'))
})
