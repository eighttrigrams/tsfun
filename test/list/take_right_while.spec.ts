import {greaterThan, isnt} from '../../src/comparator';
import {takeRightWhile} from '../../src/list';



describe('takeRightWhile', () => {


    it('take five', () =>

        expect(

            takeRightWhile(greaterThan(13))
            ([7, 9, 10, 13, 17, 20])

        ).toEqual([17, 20])
    );


    it('take none', () =>

        expect(

            takeRightWhile(greaterThan(23))
            ([7, 9, 10, 13, 17, 20])

        ).toEqual([])
    );


    it('take all', () =>

        expect(

            takeRightWhile(greaterThan(1))
            ([7, 9])

        ).toEqual([7, 9])
    );


    it('empty', () =>

        expect(

            takeRightWhile(greaterThan(23))
            ([])

        ).toEqual([])
    );


    it('string', () =>

        expect(

            takeRightWhile(isnt('a'))('abcdabbbe')

        ).toEqual('bbbe')
    );
});
