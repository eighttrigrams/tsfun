import {drop} from '../../src/arraylist';

describe('drop', () => {

    it('2', () =>

        expect(

            drop(2)
            ([8,9,11])

        ).toEqual([11])
    );


    it('all', () =>

        expect(

            drop(5)
            ([8,9,11])

        ).toEqual([])
    );


    it('none', () =>

        expect(

            drop(0)
            ([8, 9, 11])

        ).toEqual([8, 9, 11])
    );


    it('5 of empty', () =>

        expect(

            drop(5)
            ([])

        ).toEqual([])
    );


    it('0 of empty', () =>

        expect(

            drop(0)
            ([])

        ).toEqual([])
    );


    it('string', () =>

        expect(

            drop(2)
            ('abc')

        ).toEqual('c')
    );


    it('string - from empty', () =>

        expect(

            drop(2)
            ('')

        ).toEqual('')
    );
});
