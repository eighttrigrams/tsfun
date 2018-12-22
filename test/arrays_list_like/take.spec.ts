import {take} from '../../src/collections/arrays_list_like_pick';


describe('take', () => {

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
});
