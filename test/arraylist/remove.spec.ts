import {lessThan} from '../../src/comparator';
import {flow} from '../../src/composition';
import {remove} from '../../src/arraylist';


describe('remove', () => {


    it('remove', () =>
        expect(

            flow([2, 4, 3],
                remove(lessThan(4))))

            .toEqual([4]));
});
