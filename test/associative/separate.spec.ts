import {separate} from '../../src/associative';
import {greaterThan, lessThan} from '../../src/comparator';


describe('separate', () => {

    it('array', () =>

        expect(

            separate(lessThan(3))([2, 3, 1, 3, 4]))

            .toEqual([[2, 1], [3, 3, 4]]));


    it('object', () =>

        expect(

            separate(lessThan(3))({a: 13, b: 1, c: -1, d: 19}))

            .toEqual([{b: 1, c: -1},{a: 13, d: 19}]));


    it('array - with i', () =>

        expect(

            separate((v: number, i: number) => i < 3)([2, 3, 1, 3, 4]))

            .toEqual([[2, 3, 1], [3, 4]]));


    it('object - with k', () =>

        expect(

            separate((v: number, k: string) => k === 'm')({d: 3, e: 4, m: 7}))

            .toEqual([{ m: 7 }, { d: 3, e: 4 }]));


    it('string', () =>

        expect(

            separate(greaterThan('b'))('abcde'))

            .toEqual(['cde', 'ab']));
});
