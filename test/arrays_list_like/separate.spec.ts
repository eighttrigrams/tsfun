import {separate} from '../../src/collections/arrays_list_like';
import {smallerThan} from '../../src/comparators';


describe('separate', () => {

    it('separate', () =>

        expect(

            separate(smallerThan(3))([2, 3, 1, 3, 4]))

            .toEqual([[2, 1], [3, 3, 4]]));
});
