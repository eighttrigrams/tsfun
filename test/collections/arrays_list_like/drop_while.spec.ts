import {dropRightWhile, dropWhile} from '../../../src/collections/arrays_list_like_pick';
import {biggerThan, smallerThan} from '../../../src/comparators';


describe('Take/dropWhile', () => {


    it('dropWhile - drop five', () =>

        expect(

            dropWhile(smallerThan(20))
            ([7, 9, 10, 13, 21, 20])

        ).toEqual([21, 20])
    );


    it('dropWhile - drop none', () =>

        expect(

            dropWhile(smallerThan(5))
            ([7, 9, 10, 13, 21, 20])

        ).toEqual([7, 9, 10, 13, 21, 20])
    );


    it('dropWhile - empty', () =>

        expect(

            dropWhile(smallerThan(20))
            ([])

        ).toEqual([])
    );


    it('dropRightWhile', () =>

        expect(

            dropRightWhile(biggerThan(19))
            ([13, 21, 20])

        ).toEqual([13])
    );


    it('dropRightWhile - none', () =>

        expect(

            dropRightWhile(smallerThan(19))
            ([13, 21, 20])

        ).toEqual([13, 21, 20])
    );


    it('dropRightWhile - all', () =>

        expect(

            dropRightWhile(biggerThan(1))
            ([13, 21, 20])

        ).toEqual([])
    );


    it('dropRightWhile - of empty', () =>

        expect(

            dropRightWhile(biggerThan(1))
            ([])

        ).toEqual([])
    );
});
