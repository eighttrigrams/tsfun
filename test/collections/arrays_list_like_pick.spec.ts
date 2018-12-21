import {
    drop,
    dropRight,
    dropRightWhile,
    dropWhile,
    take,
    takeNth,
    takeRightWhile,
    takeUntil,
    takeWhile
} from '../../src/collections/arrays_list_like_pick';

import {biggerThan, smallerThan} from '../../src/comparators';


describe('Take', () => {

    it('takeNth - 2', () =>

        expect(

            takeNth(2)([1,2,7,8,9,11])

        ).toEqual([1,7,9])
    );


    it('takeNth - 3', () =>

        expect(

            takeNth(3)([1, 2, 7, 8, 9, 11, 13, 14])

        ).toEqual([1, 8, 13])
    );


    it('takeNth - 7 of empty', () =>

        expect(

            takeNth(7)([])

        ).toEqual([])
    );


    it('takeNth - 0 of empty', () =>

        expect(

            takeNth(0)([])

        ).toEqual([])
    );


    it('takeNth - 2 of one item', () =>

        expect(

            takeNth(2)([1])

        ).toEqual([1])
    );


    it('takeNth - of negative', () =>

        expect(

            takeNth(-1)([1])

        ).toEqual([])
    );


    it('take - 5', () =>

        expect(

            take(5)
                ([1,2,7,7,8,9,11])

        ).toEqual([1,2,7,7,8])
    );


    it('take - 0', () =>

        expect(

            take(0)
                ([1, 2, 7, 7, 8, 9, 11])

        ).toEqual([])
    );


    it('take - more', () =>

        expect(

            take(3)
                ([1, 2])

        ).toEqual([1, 2])
    );


    it('take - from empty', () =>

        expect(

            take(3)
                ([])

        ).toEqual([])
    );


    it('take - negative n', () =>

        expect(

            take(-1)
                ([1, 2])

        ).toEqual([])
    );


    it('takeWhile - take five', () =>

        expect(

            takeWhile(smallerThan(20))
                ([7, 9, 10, 13, 17, 20])

        ).toEqual([7, 9, 10, 13, 17])
    );


    it('takeWhile - take none', () =>

        expect(

            takeWhile(biggerThan(23))
                ([7, 9, 10, 13, 17, 20])

        ).toEqual([])
    );


    it('takeWhile - take all', () =>

        expect(

            takeWhile(biggerThan(1))
            ([7, 9])

        ).toEqual([7, 9])
    );


    it('takeWhile - empty', () =>

        expect(takeWhile(biggerThan(23))
            ([])).toEqual([])
    );


    it('takeRightWhile - take five', () =>

        expect(

            takeRightWhile(biggerThan(13))
                ([7, 9, 10, 13, 17, 20])

        ).toEqual([17, 20])
    );


    it('takeRightWhile - take none', () =>

        expect(

            takeRightWhile(biggerThan(23))
                ([7, 9, 10, 13, 17, 20])

        ).toEqual([])
    );


    it('takeRightWhile - take all', () =>

        expect(

            takeRightWhile(biggerThan(1))
                ([7, 9])

        ).toEqual([7, 9])
    );


    it('takeRightWhile - empty', () =>

        expect(

            takeRightWhile(biggerThan(23))
                ([])

        ).toEqual([])
    );


    it('takeUntil - take two', () => {

        expect(

            takeUntil(biggerThan(7))
                ([7, 9, 11])

        ).toEqual([7, 9]);
    });


    it('takeUntil - take all', () =>

        expect(

            takeUntil(biggerThan(13))
                ([7, 9, 11])

        ).toEqual([7, 9, 11])
    );


    it('takeUntil - empty', () =>

        expect(

            takeUntil(biggerThan(13))
                ([])

        ).toEqual([])
    );

    it('drop - 2', () =>

        expect(

            drop(2)
            ([8,9,11])

        ).toEqual([11])
    );


    it('drop - all', () =>

        expect(

            drop(5)
            ([8,9,11])

        ).toEqual([])
    );


    it('drop - none', () =>

        expect(

            drop(0)
            ([8, 9, 11])

        ).toEqual([8, 9, 11])
    );


    it('drop - 5 of empty', () =>

        expect(

            drop(5)
            ([])

        ).toEqual([])
    );


    it('drop - 0 of empty', () =>

        expect(

            drop(0)
            ([])

        ).toEqual([])
    );


    it('dropRight - 2', () =>

        expect(

            dropRight(2)
            ([8,9,11])

        ).toEqual([8])
    );


    it('dropRight - all', () =>

        expect(

            dropRight(5)
            ([8,9,11])

        ).toEqual([])
    );


    it('dropRight - none', () =>

        expect(

            dropRight(0)
            ([8,9,11])

        ).toEqual([8, 9, 11])
    );


    it('dropRight - 2 of empty', () =>

        expect(

            dropRight(0)
            ([])

        ).toEqual([])
    );


    it('dropRight - none of empty', () =>

        expect(

            dropRight(0)
            ([])

        ).toEqual([])
    );


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
