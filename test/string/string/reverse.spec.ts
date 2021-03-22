import { reverse } from '../../../string'


/**
 * tsfun/string | reverse
 */
describe('string/reverse', () => {

    it('string', () =>
        expect(

            reverse('aloha')

        ).toEqual('ahola')
    )
})
