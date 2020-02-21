import {filter} from '../../src/async';


describe('async/filter', () => {

    it('array', async done => {

        expect(

            await filter((_: any) => Promise.resolve(_ < 4))([2, 4, 3]))

            .toEqual([2, 3]);

        done();
    });


    it('object', async done => {

        expect(

            await filter((_: any) => Promise.resolve(_ < 4))({a: 2, b: 4, c: 3}))

            .toEqual({a: 2, c: 3});

        done();
    });
});
