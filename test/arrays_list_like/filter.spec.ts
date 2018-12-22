import {filter} from '../../src/collections/arrays_list_like';
import {flow} from '../../src/flow';
import {smallerThan} from '../../src/comparators';


describe('filter', () => {

    // filter

    it('filter', () =>
        expect(

            flow([2, 4, 3],
                filter(smallerThan(4))))

            .toEqual([2, 3]));
});
