import {indices} from '../../src/associative'
import {gt, is} from '../../src/comparator'


/**
 * tsfun | indices
 */
describe('indices', () => {

    it('array of string', () => {

        expect(indices(is('3'))(['1', '3', '7', '1'])).toEqual([1])
        expect(indices(is('3'), ['1', '3', '7', '1'])).toEqual([1])
    })


    it('array of number', () =>
        expect(

            indices(gt(2))([1, 3, 7, 1])

        ).toEqual([1, 2]))


    it('object', () =>
        expect(

            indices(gt(2))({a: 3, b: 1, c: 7})

        ).toEqual(['a', 'c']))
})
