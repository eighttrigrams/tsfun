import {greaterThan, lessThan} from '../../../src/comparator';
import {dropRightWhile} from '../../../src/list';


/**
 * tsfun | list/dropRightWhile
 */
describe('list/dropRightWhile', () => {

    it('dropRightWhile', () => {

        expect(dropRightWhile(greaterThan(19))([13, 21, 20])).toEqual([13])
        expect(dropRightWhile(greaterThan(19), [13, 21, 20])).toEqual([13])
    })


    it('none', () =>

        expect(

            dropRightWhile(lessThan(19))
            ([13, 21, 20])

        ).toEqual([13, 21, 20])
    );


    it('all', () =>

        expect(

            dropRightWhile(greaterThan(1))
            ([13, 21, 20])

        ).toEqual([])
    );


    it('of empty', () =>

        expect(

            dropRightWhile(greaterThan(1))
            ([])

        ).toEqual([])
    );


    it('string', () =>

        expect(

            dropRightWhile(greaterThan('f'))('bbedeajjjk')

        ).toEqual('bbedea')
    )
})
