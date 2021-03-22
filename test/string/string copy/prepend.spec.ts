import {prepend} from '../../../src/string'


/**
 * tsfun/string | prepend
 */
describe('stringPrepend', () => {

    it('string', () =>

        expect(

            prepend('g', 'h')('mno'))

            .toEqual('ghmno'))
})
