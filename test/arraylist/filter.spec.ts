import {smallerThan} from '../../src/comparator';
import {flow} from '../../src/composition';
import {asyncFilter, filter} from '../../src/arraylist';


describe('filter', () => {

    // filter

    it('filter', () =>
        expect(

            flow([2, 4, 3],
                filter(smallerThan(4))))

            .toEqual([2, 3]));


    it('asyncFilter', async done => {

        expect(

            await asyncFilter(_ => Promise.resolve(_ < 4))([2, 4, 3]))

            .toEqual([2, 3]);

        done();
    });
});
