import { rest } from '../../string'


/**
 * tsfun/string | rest
 */
describe('string/rest', () => {

    it('string', () =>
        expect(

            rest('abc')

        ).toEqual('bc'))


    it('string - from empty', () =>
        expect(

            rest('')

        ).toEqual(''))
})
