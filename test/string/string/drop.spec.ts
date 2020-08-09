import {drop} from '../../../src/string';

/**
 * tsfun/string | drop
 */
describe('string/drop', () => {

    it('string', () =>

        expect(

            drop(2)
            ('abc')

        ).toEqual('c')
    )


    it('string - from empty', () =>

        expect(

            drop(2)
            ('')

        ).toEqual('')
    )
})
