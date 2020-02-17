import {lessThan} from '../../src/comparator';
import {separate} from '../../src/associative';


describe('separate', () => {

    it('array', () =>

        expect(

            separate(lessThan(3))([2, 3, 1, 3, 4]))

            .toEqual([[2, 1], [3, 3, 4]]));


    it('object', () =>

        expect(

            separate(lessThan(3))({a: 13, b: 1, c: -1, d: 19}))

            .toEqual([{b: 1, c: -1},{a: 13, d: 19}]));
});
