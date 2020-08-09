import {greaterThan, lessThan} from '../../../src/comparator';
import {dropRightWhile} from '../../../src/string';


/**
 * tsfun/string | dropRightWhile
 */
describe('string/dropRightWhile', () => {

    it('string', () =>

        expect(

            dropRightWhile(greaterThan('f'))('bbedeajjjk')

        ).toEqual('bbedea')
    )
})
