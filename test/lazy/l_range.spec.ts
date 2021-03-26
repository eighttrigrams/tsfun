import {lRange, lZip, materialize} from '../../src/lazy'


/**
 * tsfun | range
 */
describe('range', () => {

    it('up to', () =>
        expect(

            materialize(lRange(0, 3))

        ).toEqual([0, 1, 2]))


    it('from to', () =>
        expect(

            materialize(lRange(3, 7))

        ).toEqual([3, 4, 5, 6]))


    it('step size', () =>
        expect(

            materialize(lRange(3, 7, 3))

        ).toEqual([3, 6]))


    it('use case', () =>
        expect(

            materialize(lZip(lRange(10))(['a', 'b', 'c']))

        ).toEqual([[0, 'a'], [1, 'b'], [2, 'c']]))
})
