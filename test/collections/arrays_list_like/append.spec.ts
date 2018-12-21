
import {append, prepend} from '../../../src/collections/arrays_list_like';


describe('Arrays/List-Like-Collection/append', () => {

    it('append', () =>

        expect(

            append([1, 2])([3, 4]))

            .toEqual([3, 4, 1, 2]));
});
