import {lessThan} from '../../src/comparator';
import {dropWhile} from '../../src/arraylist';


describe('drop', () => {


    it('dropWhile - drop five', () =>

        expect(

            dropWhile(lessThan(20))
            ([7, 9, 10, 13, 21, 20])

        ).toEqual([21, 20])
    );


    it('dropWhile - drop none', () =>

        expect(

            dropWhile(lessThan(5))
            ([7, 9, 10, 13, 21, 20])

        ).toEqual([7, 9, 10, 13, 21, 20])
    );


    it('dropWhile - empty', () =>

        expect(

            dropWhile(lessThan(20))
            ([])

        ).toEqual([])
    );
});
