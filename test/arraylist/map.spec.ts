import {asyncMap, map} from '../../src/arraylist';
import {flow} from '../../src/composition';
import {to} from '../../src/objectstruct';


/**
 * @author Daniel de Oliveira
 */
describe('map / asyncMap', () => {

    // map


    it('map', () =>
        expect(

            map((_: number) => 2 * _)([1, 2]))

            .toEqual([2, 4]));


    it('map - with to and flow', () =>
        expect(

            flow([{a: 1}, {a: 3}],
                map(to('a'))))

            .toEqual([1, 3]));


    // asyncMap

    it('asyncMap', async done => {

        expect(

            await asyncMap((_: number) => Promise.resolve(_ * 2))([1, 2]))

            .toEqual([2, 4]);

        done();
    });
});
