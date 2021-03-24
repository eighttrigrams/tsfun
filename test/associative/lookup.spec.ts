import {lookup, map_a} from '../../src/associative'


/**
 * tsfun | lookup
 */
describe('lookup', () => {

    it('lookup', () =>
        expect(

            lookup({a: 9, b: 10})('a')

        ).toEqual(9))


    it('lookup_a in array', () =>
        expect(

            lookup([3, 5, 7])(1)

        ).toEqual(5))


    it('lookup_a with map', () =>
        expect(

            map_a(lookup({a: 9, b: 10}))(['a', 'b'])

        ).toEqual([9, 10]))


    it('nothing', () =>
        expect(

            map_a(lookup({a: 9}))(['d'])

        ).toEqual([undefined]))


    it('alternative', () =>
        expect(

            map_a(lookup({a: 9}, 13))(['d'])

        ).toEqual([13]))
})
