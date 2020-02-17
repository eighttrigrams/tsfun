import {asyncFilter} from '../../async';


describe('asyncFilter', () => {


    it('asyncFilter', async done => {

        expect(

            await asyncFilter((_: any) => Promise.resolve(_ < 4))([2, 4, 3]))

            .toEqual([2, 3]);

        done();
    });
});
