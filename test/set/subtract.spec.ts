import {subtract} from '../../src/set'
import {equal} from '../../src/comparator'


/**
 * tsfun | subtract
 */
describe('subtract', () => {

    it('subtract', () =>
        expect(

            subtract([3, 4, 5])([1, 2, 3]))

            .toEqual([1, 2]))


    it('make set', () =>
        expect(

            subtract([3, 4, 5])([1, 2, 3, 3, 4, 4, 1]))

            .toEqual([1, 2]))


    it('from empty list', () =>
        expect(

            subtract([3, 4, 5])([]))

            .toEqual([]))


    it('empty list', () =>
        expect(

            subtract<number>([])([1, 2, 3]))

            .toEqual([1, 2, 3]))


    it('no intersection', () =>

        expect(

            subtract([4, 5, 6])([1, 2, 3]))

            .toEqual([1, 2, 3]))


    it('no intersection, make set', () =>
        expect(

            subtract([4, 5, 6])([1, 2, 3, 3, 2]))

            .toEqual([1, 2, 3]))


    it('comparator ', () =>
        expect(

            subtract<any>(equal, [{a: 'a'}])([{a: 'a'}, {c: 'c'}]))

            .toEqual([{c: 'c'}]))
})
