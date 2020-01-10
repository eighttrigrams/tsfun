import {lessThan} from '../../src/comparator';
import {remove} from '../../src/arraylist';
import {flow} from '../../src/composition';


describe('remove', () => {


    it('remove', () =>
        expect(

            flow([2, 4, 3],
                remove(lessThan(4))))

            .toEqual([4]));
});
