import {takeRight} from '../../src/list';


describe('takeRight', () => {


    it('1', () =>

        expect(

            takeRight(1)
            ([1, 2])

        ).toEqual([2])
    );


    it('2', () =>

        expect(

            takeRight(2)
            ([0, 1, 2])

        ).toEqual([1, 2])
    );


    it('0', () =>

        expect(

            takeRight(0)
            ([1, 2])

        ).toEqual([])
    );


    it('more', () =>

        expect(

            takeRight(3)
            ([1, 2])

        ).toEqual([1, 2])
    );


    it('negative n', () =>

        expect(

            takeRight(-1)
            ([1, 2])

        ).toEqual([])
    );


    it('from empty', () =>

        expect(

            takeRight(3)
            ([])

        ).toEqual([])
    );


    it('string', () =>

        expect(

            takeRight(3)
            ('abcd')

        ).toEqual('bcd')
    );


    it('string - all', () =>

        expect(

            takeRight(5)
            ('abcd')

        ).toEqual('abcd')
    );


    it('string - from empty', () =>

        expect(

            takeRight(5)
            ('')

        ).toEqual('')
    );
});
