import {take, takeRight} from '../../src/arraylist';


describe('take / takeRight', () => {

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


    it('takeRight - 1', () =>

        expect(

            takeRight(1)
            ([1, 2])

        ).toEqual([2])
    );


    it('takeRight - 2', () =>

        expect(

            takeRight(2)
            ([0, 1, 2])

        ).toEqual([1, 2])
    );


    it('takeRight - 0', () =>

        expect(

            takeRight(0)
            ([1, 2])

        ).toEqual([])
    );


    it('takeRight - more', () =>

        expect(

            takeRight(3)
            ([1, 2])

        ).toEqual([1, 2])
    );


    it('takeRight - negative n', () =>

        expect(

            takeRight(-1)
            ([1, 2])

        ).toEqual([])
    );


    it('takeRight - from empty', () =>

        expect(

            takeRight(3)
            ([])

        ).toEqual([])
    );
});
