import {smallerThan} from '../../src/comparator';
import {flow} from '../../src/composition';
import {filter} from '../../src/arraylist';


describe('filter', () => {

    // filter

    it('filter', () =>
        expect(

            flow([2, 4, 3],
                filter(smallerThan(4))))

            .toEqual([2, 3]));
});
