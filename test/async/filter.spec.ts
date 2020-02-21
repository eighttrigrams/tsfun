import {filter} from '../../src/async';


describe('asyncFilter', () => {


    it('asyncFilter', async done => {

        expect(

            await filter((_: any) => Promise.resolve(_ < 4))([2, 4, 3]))

            .toEqual([2, 3]);

        done();
    });
});
