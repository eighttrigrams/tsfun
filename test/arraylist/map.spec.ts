import {asyncMap, map} from '../../src/arraylist';
import {flow} from '../../src/composition';
import {to} from '../../src/objectstruct';


/**
 * @author Daniel de Oliveira
 */
describe('map', () => {


    it('map', () =>
        expect(

            map((_: number) => 2 * _)([1, 2]))

            .toEqual([2, 4]));


    it('map - with to and flow', () =>
        expect(

            flow([{a: 1}, {a: 3}],
                map(to('a'))))

            .toEqual([1, 3]));
});
