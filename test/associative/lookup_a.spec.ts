import {lookup_a, map_a} from '../../src/associative'


/**
 * tsfun | lookup_a
 */
describe('lookup_a', () => {

    it('lookup_a', () =>
        expect(

            lookup_a({a: 9, b: 10})('a')

        ).toEqual(9))


    it('lookup_a in array', () =>
        expect(

            lookup_a([3, 5, 7])(1)

        ).toEqual(5))


    it('lookup_a with map', () =>
        expect(

            map_a(lookup_a({a: 9, b: 10}))(['a', 'b'])

        ).toEqual([9, 10]))


    it('nothing', () =>
        expect(

            map_a(lookup_a({a: 9}))(['d'])

        ).toEqual([undefined]))


    it('alternative', () =>
        expect(

            map_a(lookup_a({a: 9}, 13))(['d'])

        ).toEqual([13]))
})
