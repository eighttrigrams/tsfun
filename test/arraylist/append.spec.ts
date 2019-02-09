import {append, prepend} from '../../src/arraylist';


describe('append / prepend', () => {

    it('append', () =>

        expect(

            append([1, 2])([3, 4]))

            .toEqual([3, 4, 1, 2]));


    it('prepend', () =>

        expect(

            prepend([1, 2])([3, 4]))

            .toEqual([1, 2, 3, 4]));
});
