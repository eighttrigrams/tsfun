import {prepend} from '../../../src/string'


/**
 * tsfun | list/prepend
 */
describe('stringPrepend', () => {

    it('string', () =>

        expect(

            prepend('g', 'h')('mno'))

            .toEqual('ghmno'))
})
