import {indices} from '../../src/collection';
import {greaterThan, is} from '../../src/comparator';


describe('indices', () => {

    it('array', () =>
        expect(

            indices(greaterThan(2))([1, 3, 7, 1])

        ).toEqual([1, 2]));


    it('object', () =>
        expect(

            indices(greaterThan(2))({a: 3, b: 1, c: 7})

        ).toEqual(['a', 'c']));


    it('string', () =>
        expect(

            indices(is('d'))('dded')

        ).toEqual([0, 1, 3]));
});