import {dropRight} from '../../src/arraylist';

describe('dropRight', () => {


    it('dropRight - 2', () =>

        expect(

            dropRight(2)
            ([8,9,11])

        ).toEqual([8])
    );


    it('dropRight - all', () =>

        expect(

            dropRight(5)
            ([8,9,11])

        ).toEqual([])
    );


    it('dropRight - none', () =>

        expect(

            dropRight(0)
            ([8,9,11])

        ).toEqual([8, 9, 11])
    );


    it('dropRight - 2 of empty', () =>

        expect(

            dropRight(0)
            ([])

        ).toEqual([])
    );


    it('dropRight - none of empty', () =>

        expect(

            dropRight(0)
            ([])

        ).toEqual([])
    );
});
