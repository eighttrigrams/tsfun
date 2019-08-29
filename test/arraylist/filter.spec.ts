import {lessThan} from '../../src/comparator';
import {flow} from '../../src/composition';
import {filter, remove} from '../../src/arraylist';


describe('filter', () => {

    it('filter', () =>
        expect(

            flow([2, 4, 3],
                filter(lessThan(4))))

            .toEqual([2, 3]));
});
