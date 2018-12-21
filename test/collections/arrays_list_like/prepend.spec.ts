import {prepend} from '../../../src/collections/arrays_list_like';


describe('prepend', () => {

    // prepend

    it('prepend', () =>

        expect(

            prepend([1, 2])([3, 4]))

            .toEqual([1, 2, 3, 4]));
});
