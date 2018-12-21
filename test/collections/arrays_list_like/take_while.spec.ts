import {takeRightWhile, takeWhile} from '../../../src/collections/arrays_list_like_pick';
import {biggerThan, smallerThan} from '../../../src/comparators';

describe('Take/takeWhile', () => {

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
});
