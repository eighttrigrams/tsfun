import {flatten} from '../../src/list';


/**
 * @author Daniel de Oliveira
 */
describe('flatten', () => {


    it('1 level - implicitly', () =>
        expect(

            flatten([[1, 2], [3, 4]])

        ).toEqual([1, 2, 3, 4]));


    it('1 - level - explicitly', () =>
        expect(

            flatten(1)([[1, [2, 3]], [4, [5, [6, 7]]]])

        ).toEqual([1, [2, 3], 4, [5, [6, 7]]]));


    it('2 - levels', () =>
        expect(

            flatten(2)([[1, [2, 3]], [4, [5, [6, 7]]]])

        ).toEqual([1, 2, 3, 4, 5, [6, 7]]));


    it('3 - levels', () =>
        expect(

            flatten(3)([[1, [2, [3, 4]]], [5, [6, [7, 8]]]])

        ).toEqual([1, 2, 3, 4, 5, 6, 7, 8]));


    it('1 - level - but not level to compress - implicitly', () =>
        expect(

            flatten([1, 2] as any)

        ).toEqual([1, 2]));


    it('1 - level - but not level to compress - explicitly', () =>
        expect(

            flatten(1)([1, 2] as any)

        ).toEqual([1, 2]));


    it('2 - level - but not level to compress', () =>
        expect(

            flatten(2)([1, 2])

        ).toEqual([1, 2]));
});
