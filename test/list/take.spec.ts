import {take} from '../../src/list';


describe('take', () => {

    it('5', () =>

        expect(

            take(5)
            ([1,2,7,7,8,9,11])

        ).toEqual([1,2,7,7,8])
    );


    it('0', () =>

        expect(

            take(0)
            ([1, 2, 7, 7, 8, 9, 11])

        ).toEqual([])
    );


    it('more', () =>

        expect(

            take(3)
            ([1, 2])

        ).toEqual([1, 2])
    );


    it('from empty', () =>

        expect(

            take(3)
            ([])

        ).toEqual([])
    );


    it('negative n', () =>

        expect(

            take(-1)
            ([1, 2])

        ).toEqual([])
    );


    it('string', () =>

        expect(

            take(4)
            ('sosos')

        ).toEqual('soso')
    );


    it('string - from empty', () =>

        expect(

            take(4)
            ('')

        ).toEqual('')
    );
});
