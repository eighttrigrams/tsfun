import {lessThan} from '../../src/comparator';
import {flow} from '../../src/composition';
import {asyncFilter, filter, remove} from '../../src/arraylist';


describe('filter / remove', () => {

    it('filter', () =>
        expect(

            flow([2, 4, 3],
                filter(lessThan(4))))

            .toEqual([2, 3]));


    it('asyncFilter', async done => {

        expect(

            await asyncFilter(_ => Promise.resolve(_ < 4))([2, 4, 3]))

            .toEqual([2, 3]);

        done();
    });


    it('remove', () =>
        expect(

            flow([2, 4, 3],
                remove(lessThan(4))))

            .toEqual([4]));
});
