/**
 * @author Daniel de Oliveira
 */
import {asyncMap} from '../../async';


describe('asyncMap', () => {

    it('asyncMap', async done => {

        expect(

            await asyncMap((_: number) => Promise.resolve(_ * 2))([1, 2]))

            .toEqual([2, 4]);

        done();
    });
});