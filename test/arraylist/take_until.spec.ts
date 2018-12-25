import {greaterThan} from '../../src/comparator';
import {takeUntil} from '../../src/arraylist';


describe('takeUntil', () => {



    it('takeUntil - take two', () => {

        expect(

            takeUntil(greaterThan(7))
            ([7, 9, 11])

        ).toEqual([7, 9]);
    });


    it('takeUntil - take all', () =>

        expect(

            takeUntil(greaterThan(13))
            ([7, 9, 11])

        ).toEqual([7, 9, 11])
    );


    it('takeUntil - empty', () =>

        expect(

            takeUntil(greaterThan(13))
            ([])

        ).toEqual([])
    );
});
