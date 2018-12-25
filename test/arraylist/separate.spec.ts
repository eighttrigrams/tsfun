import {lessThan} from '../../src/comparator';
import {separate} from '../../src/arraylist';


describe('separate', () => {

    it('separate', () =>

        expect(

            separate(lessThan(3))([2, 3, 1, 3, 4]))

            .toEqual([[2, 1], [3, 3, 4]]));
});
