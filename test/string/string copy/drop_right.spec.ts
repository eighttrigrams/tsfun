import {dropRight} from '../../../src/string';


/**
 * tsfun/string | dropRight
 */
describe('string/dropRight', () => {

    it('string', () =>

        expect(

            dropRight(1)
            ('abc')

        ).toEqual('ab')
    )


    it('string - all', () =>

        expect(

            dropRight(4)
            ('abc')

        ).toEqual('')
    )


    it('string - from empty', () =>

        expect(

            dropRight(4)
            ('')

        ).toEqual('')
    )
})
