import {lessThan} from '../../src/comparator';
import {filter} from '../../src/associative';


describe('filter', () => {

    it('filter', () =>
        expect(

            filter(lessThan(4))([2, 4, 3])

        ).toEqual([2, 3]));

    it('filter object', () =>
        expect(

            filter(lessThan(4))({a: 2, b: 4, c: 3}))

        .toEqual({a: 2, c: 3}));
});
