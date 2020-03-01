import {indices} from '../../src/arraylist';
import {is} from '../../src/comparator';


describe('indices', () => {

    it('indices', () =>
        expect(

            indices((x: number) => x > 2)([1, 3, 7, 1])

        ).toEqual([1, 2]));


    it('string', () =>
        expect(

            indices(is('d'))('dded')

        ).toEqual([0, 1, 3]));
});