import {drop, dropRight} from '../../src/collections/arrays_list_like_pick';

describe('drop / dropRight', () => {



    it('drop - 2', () =>

        expect(

            drop(2)
            ([8,9,11])

        ).toEqual([11])
    );


    it('drop - all', () =>

        expect(

            drop(5)
            ([8,9,11])

        ).toEqual([])
    );


    it('drop - none', () =>

        expect(

            drop(0)
            ([8, 9, 11])

        ).toEqual([8, 9, 11])
    );


    it('drop - 5 of empty', () =>

        expect(

            drop(5)
            ([])

        ).toEqual([])
    );


    it('drop - 0 of empty', () =>

        expect(

            drop(0)
            ([])

        ).toEqual([])
    );


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
