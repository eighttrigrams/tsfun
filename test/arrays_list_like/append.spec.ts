import {append} from '../../src/arraylist';


describe('append', () => {

    it('append', () =>

        expect(

            append([1, 2])([3, 4]))

            .toEqual([3, 4, 1, 2]));
});
