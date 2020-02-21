import {map as asyncMap} from '../../src/async';

/**
 * @author Daniel de Oliveira
 */
describe('async/map', () => {

    it('array', async done => {

        expect(

            await asyncMap((_: number) => Promise.resolve(_ * 2))([1, 2]))

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