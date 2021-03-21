import {lookup, map1} from '../../../src/associative'


/**
 * tsfun/associative | lookup
 */
describe('lookup', () => {

    it('lookup', () =>
        expect(

            lookup({a: 9, b: 10})('a')

        ).toEqual(9))


    it('lookup in array', () =>
        expect(

            lookup([3, 5, 7])(1)

        ).toEqual(5))


    it('lookup with map', () =>
        expect(

            map1(lookup({a: 9, b: 10}))(['a', 'b'])

        ).toEqual([9, 10]))


    it('nothing', () =>
        expect(

            map1(lookup({a: 9}))(['d'])

        ).toEqual([undefined]))


    it('alternative', () =>
        expect(

            map1(lookup({a: 9}, 13))(['d'])

        ).toEqual([13]))
})
