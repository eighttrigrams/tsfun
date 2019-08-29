import {greaterThan, lessThan} from '../../src/comparator';
import {takeWhile} from '../../src/arraylist';



describe('takeWhile', () => {


    it('takeWhile - take five', () =>

        expect(

            takeWhile(lessThan(20))
            ([7, 9, 10, 13, 17, 20])

        ).toEqual([7, 9, 10, 13, 17])
    );


    it('takeWhile - take none', () =>

        expect(

            takeWhile(greaterThan(23))
            ([7, 9, 10, 13, 17, 20])

        ).toEqual([])
    );


    it('takeWhile - take all', () =>

        expect(

            takeWhile(greaterThan(1))
            ([7, 9])

        ).toEqual([7, 9])
    );


    it('takeWhile - empty', () =>

        expect(takeWhile(greaterThan(23))
        ([])).toEqual([])
    );
});
