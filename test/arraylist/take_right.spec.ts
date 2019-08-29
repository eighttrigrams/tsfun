import {takeRight} from '../../src/arraylist';


describe('takeRight', () => {


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
