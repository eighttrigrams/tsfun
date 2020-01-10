/**
 * @author Daniel de Oliveira
 */
import {subtract} from "../../src/arrayset";


describe('subtract', () => {


    it('subtract', () =>
        expect(

            subtract([3, 4, 5])([1, 2, 3]))

            .toEqual([1, 2]));


    it('subtract - make unique', () =>
        expect(

            subtract([3, 4, 5])([1, 2, 3, 3, 4, 4, 1]))

            .toEqual([1, 2]));


    it('subtract - from empty list', () =>
        expect(

            subtract([3, 4, 5])([]))

            .toEqual([]));


    it('subtract - empty list', () =>
        expect(

            subtract<number>([])([1, 2, 3]))

            .toEqual([1, 2, 3]));


    it('subtract - no intersection', () =>

        expect(

            subtract([4, 5, 6])([1, 2, 3]))

            .toEqual([1, 2, 3]));


    it('subtract - no intersection, make unique', () =>
        expect(

            subtract([4, 5, 6])([1, 2, 3, 3, 2]))

            .toEqual([1, 2, 3]));
});
