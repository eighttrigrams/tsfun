import {lessThan} from '../../src/comparator';
import {filter, remove} from '../../src/arraylist';
import {flow} from '../../src/composition';


describe('filter', () => {

    it('filter', () =>
        expect(

            flow([2, 4, 3],
                filter(lessThan(4))))

            .toEqual([2, 3]));
});
