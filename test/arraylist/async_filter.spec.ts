import {asyncFilter} from '../../src/arraylist';


describe('asyncFilter', () => {


    it('asyncFilter', async done => {

        expect(

            await asyncFilter(_ => Promise.resolve(_ < 4))([2, 4, 3]))

            .toEqual([2, 3]);

        done();
    });
});
