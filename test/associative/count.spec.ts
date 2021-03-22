import { count } from '../../src/associative'
import {greaterThan} from '../../src/comparator'


/**
 * tsfun | count
 */
describe('count', () => {

    it('array', () => {

        expect(count(greaterThan(2))([3, 2, 7])).toEqual(2)
        expect(count(greaterThan(2), [3, 2, 7])).toEqual(2)
    })


    it('object', () => {

        expect(count(greaterThan(2))({a: 3, b: 2, c: 7})).toEqual(2)
        expect(count(greaterThan(2), {a: 3, b: 2, c: 7})).toEqual(2)
    })
})