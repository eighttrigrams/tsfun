import { last } from '../../string'


/**
 * tsfun/string | last
 */
describe('string/last', () => {


    it('string', () =>
        expect(

            last('abc')

        ).toEqual('c'))


    it('string - from empty', () =>
        expect(

            last('')

        ).toBeUndefined())
})
