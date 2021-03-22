import { first } from '../../string'


/**
 * tsfun/string | first
 */
describe('string/first', () => {

    it('string', () =>
        expect(

            first('abc')

        ).toEqual('a'));


    it('string - from empty', () =>
        expect(

            first('')

        ).toBeUndefined())
})
