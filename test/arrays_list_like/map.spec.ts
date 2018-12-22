import {flow} from '../../src/flow';
import {to} from '../../src/struct';
import {map} from '../../src/collections/arrays_list_like';


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
