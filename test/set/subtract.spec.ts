import {subtract} from '../../src/set'
import {jsonEqual} from '../../src/comparator'


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


    it('string', () =>
        expect(

            subtract('456')('12332'))

            .toEqual('123'))


    it('comparator ', () =>
        expect(

            subtract<any>(jsonEqual, [{a: 'a'}])([{a: 'a'}, {c: 'c'}]))

            .toEqual([{c: 'c'}]))
})
