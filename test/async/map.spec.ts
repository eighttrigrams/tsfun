import {map as asyncMap} from '../../src/async';

/**
 * @author Daniel de Oliveira
 */
describe('asyncMap', () => {

    it('asyncMap', async done => {

        expect(

            await asyncMap((_: number) => Promise.resolve(_ * 2))([1, 2]))

            .toEqual([2, 4]);

        done();
    });
});