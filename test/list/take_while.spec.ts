import {greaterThan, lessThan} from '../../src/comparator';
import {takeWhile} from '../../src/list';


describe('takeWhile', () => {

    it('take five', () =>

        expect(

            takeWhile(lessThan(20))
            ([7, 9, 10, 13, 17, 20])

        ).toEqual([7, 9, 10, 13, 17])
    );


    it('take none', () =>

        expect(

            takeWhile(greaterThan(23))
            ([7, 9, 10, 13, 17, 20])

        ).toEqual([])
    );


    it('take all', () =>

        expect(

            takeWhile(greaterThan(1))
            ([7, 9])

        ).toEqual([7, 9])
    );


    it('empty', () =>

        expect(

            takeWhile(greaterThan(23))([])

        ).toEqual([])
    );


    it('string', () =>

        expect(

            takeWhile(greaterThan('a'))('ddeaf')

        ).toEqual('dde')
    );
});
