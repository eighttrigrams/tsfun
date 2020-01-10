import {map} from '../../src/associative';
import {to} from '../../src/struct';
import {flow} from '../../src/composition';


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


    it('map object', () =>
        expect(

            map((_: number) => 2 * _)({a: 1, b: 2}))

            .toEqual({a: 2, b: 4}));
});
