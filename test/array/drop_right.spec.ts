import {dropRight} from '../../src/array';


/**
 * tsfun | dropRight
 */
describe('dropRight', () => {

    it('2', () => {

        expect(dropRight(2)([8, 9, 11])).toEqual([8])
        expect(dropRight(2, [8, 9, 11])).toEqual([8])
    });


    it('all', () =>

        expect(

            dropRight(5)
            ([8,9,11])

        ).toEqual([])
    );


    it('none', () =>

        expect(

            dropRight(0)
            ([8,9,11])

        ).toEqual([8, 9, 11])
    );


    it('2 of empty', () =>

        expect(

            dropRight(0)
            ([])

        ).toEqual([])
    );


    it('none of empty', () =>

        expect(

            dropRight(0)
            ([])

        ).toEqual([])
    );
});
