import {greaterThan} from '../../src/comparator';
import {takeRightWhile} from '../../src/arraylist';



describe('takeRightWhile', () => {


    it('takeRightWhile - take five', () =>

        expect(

            takeRightWhile(greaterThan(13))
            ([7, 9, 10, 13, 17, 20])

        ).toEqual([17, 20])
    );


    it('takeRightWhile - take none', () =>

        expect(

            takeRightWhile(greaterThan(23))
            ([7, 9, 10, 13, 17, 20])

        ).toEqual([])
    );


    it('takeRightWhile - take all', () =>

        expect(

            takeRightWhile(greaterThan(1))
            ([7, 9])

        ).toEqual([7, 9])
    );


    it('takeRightWhile - empty', () =>

        expect(

            takeRightWhile(greaterThan(23))
            ([])

        ).toEqual([])
    );
});
