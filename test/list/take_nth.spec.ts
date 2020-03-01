import {takeNth} from '../../src/list';


describe('takeNth', () => {

    it('2', () =>

        expect(

            takeNth(2)([1,2,7,8,9,11])

        ).toEqual([1,7,9])
    );


    it('every', () =>

        expect(

            takeNth(1)([1,2,7])

        ).toEqual([1,2,7])
    );


    it('3', () =>

        expect(

            takeNth(3)([1, 2, 7, 8, 9, 11, 13, 14])

        ).toEqual([1, 8, 13])
    );


    it('7 of empty', () =>

        expect(

            takeNth(7)([])

        ).toEqual([])
    );


    it('0 of empty', () =>

        expect(

            takeNth(0)([])

        ).toEqual([])
    );


    it('0', () =>

        expect(

            takeNth(0)([3, 9, 8])

        ).toEqual([])
    );


    it('2 of one item', () =>

        expect(

            takeNth(2)([1])

        ).toEqual([1])
    );


    it('of negative', () =>

        expect(

            takeNth(-1)([1])

        ).toEqual([])
    );


    it('string', () =>

        expect(

            takeNth(2)('abcd')

        ).toEqual('ac')
    );


    it('string - 0', () =>

        expect(

            takeNth(0)('abcd')

        ).toEqual('')
    );


    it('string - negative', () =>

        expect(

            takeNth(-1)('abcd')

        ).toEqual('')
    );


    it('string - of empty', () =>

        expect(

            takeNth(1)('')

        ).toEqual('')
    );


    it('string - every', () =>

        expect(

            takeNth(1)('abc')

        ).toEqual('abc')
    );
});
