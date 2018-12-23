import {takeNth} from '../../src/collections/arrays_list_like';


describe('takeNth', () => {

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
});
