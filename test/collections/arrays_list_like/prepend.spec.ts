import {prepend} from '../../../src/collections/arrays_list_like';


describe('Arrays/List-Like-Collection/prepend', () => {

    // prepend

    it('prepend', () =>

        expect(

            prepend([1, 2])([3, 4]))

            .toEqual([1, 2, 3, 4]));
});
