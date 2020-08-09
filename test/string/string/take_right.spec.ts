import {takeRight} from '../../../src/string';


/**
 * tsfun/string | takeRight
 */
describe('string/takeRight', () => {

    it('string', () =>

        expect(

            takeRight(3)
            ('abcd')

        ).toEqual('bcd')
    )


    it('string - all', () =>

        expect(

            takeRight(5)
            ('abcd')

        ).toEqual('abcd')
    )


    it('string - from empty', () =>

        expect(

            takeRight(5)
            ('')

        ).toEqual('')
    )
})
