import {lessThan} from '../../src/comparator';
import {remove} from '../../src/associative';


describe('remove', () => {

    it('remove', () =>
        expect(

            remove(lessThan(4))([2, 4])

        ).toEqual([4]));


    it('remove', () =>
        expect(

            remove(lessThan(4))({a: 2, b: 4})

        ).toEqual({b: 4}));
});
