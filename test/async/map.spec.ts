import {map as asyncMap} from '../../src/async';

/**
 * tsfun | async/map
 */
describe('async/map', () => {

    it('array', async done => {

        expect(

            await asyncMap((_: number) =>
                new Promise<any>(resolve => setTimeout(() => resolve(_ * 2), 50)))
            ([1, 2]))

            .toEqual([2, 4]);

        expect(

            await asyncMap((_: number) =>
                new Promise<any>(resolve => setTimeout(() => resolve(_ * 2), 50))
                , [1, 2]))

            .toEqual([2, 4]);

        done();
    });


    it('object', async done => {

        expect(

            await asyncMap((_: number) => Promise.resolve(_ * 2))({a: 1, b: 2}))

            .toEqual({a: 2, b: 4});

        done();
    });
});