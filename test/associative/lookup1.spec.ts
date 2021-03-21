import {lookup1, map1} from '../../src/associative'


/**
 * associative | lookup1
 */
describe('lookup', () => {

    it('lookup1', () =>
        expect(

            lookup1({a: 9, b: 10})('a')

        ).toEqual(9))


    it('lookup1 in array', () =>
        expect(

            lookup1([3, 5, 7])(1)

        ).toEqual(5))


    it('lookup1 with map', () =>
        expect(

            map1(lookup1({a: 9, b: 10}))(['a', 'b'])

        ).toEqual([9, 10]))


    it('nothing', () =>
        expect(

            map1(lookup1({a: 9}))(['d'])

        ).toEqual([undefined]))


    it('alternative', () =>
        expect(

            map1(lookup1({a: 9}, 13))(['d'])

        ).toEqual([13]))
})
