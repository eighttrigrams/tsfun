import {greaterThan, lessThan} from '../../src/comparator';
import {dropRightWhile} from '../../src/arraylist';


describe('dropRightWhile', () => {


    it('dropRightWhile', () =>

        expect(

            dropRightWhile(greaterThan(19))
            ([13, 21, 20])

        ).toEqual([13])
    );


    it('dropRightWhile - none', () =>

        expect(

            dropRightWhile(lessThan(19))
            ([13, 21, 20])

        ).toEqual([13, 21, 20])
    );


    it('dropRightWhile - all', () =>

        expect(

            dropRightWhile(greaterThan(1))
            ([13, 21, 20])

        ).toEqual([])
    );


    it('dropRightWhile - of empty', () =>

        expect(

            dropRightWhile(greaterThan(1))
            ([])

        ).toEqual([])
    );
});
