import {takeUntil} from '../../../src/collections/arrays_list_like_pick';
import {biggerThan} from '../../../src/comparators';


describe('takeUntil', () => {



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
});
