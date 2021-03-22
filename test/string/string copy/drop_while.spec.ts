import {lessThan} from '../../../src/comparator';
import {dropWhile} from '../../../src/string';


/**
 * tsfun/string | dropWhile
 */
describe('string/dropWhile', () => {

    it('string', () =>

        expect(

            dropWhile(lessThan('f'))
            ('ddefabc')

        ).toEqual('fabc')
    )
})
