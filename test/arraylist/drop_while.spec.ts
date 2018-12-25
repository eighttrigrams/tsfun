import {greaterThan, lessThan} from '../../src/comparator';
import {dropRightWhile, dropWhile} from '../../src/arraylist';


describe('drop/dropRightWhile', () => {


    it('dropWhile - drop five', () =>

        expect(

            dropWhile(lessThan(20))
            ([7, 9, 10, 13, 21, 20])

        ).toEqual([21, 20])
    );


    it('dropWhile - drop none', () =>

        expect(

            dropWhile(lessThan(5))
            ([7, 9, 10, 13, 21, 20])

        ).toEqual([7, 9, 10, 13, 21, 20])
    );


    it('dropWhile - empty', () =>

        expect(

            dropWhile(lessThan(20))
            ([])

        ).toEqual([])
    );


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
