import {prepend} from '../../src/string'


/**
 * tsfun/string | prepend
 */
describe('string/prepend', () => {

    it('string', () =>

        expect(

            prepend('g', 'h')('mno'))

            .toEqual('ghmno'))
})
