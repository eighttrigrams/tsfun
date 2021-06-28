import { count } from '../../src/associative'
import {gt} from '../../src/comparator'


/**
 * tsfun | count
 */
describe('count', () => {

    it('array', () => {

        expect(count(gt(2))([3, 2, 7])).toEqual(2)
        expect(count(gt(2), [3, 2, 7])).toEqual(2)
    })


    it('object', () => {

        expect(count(gt(2))({a: 3, b: 2, c: 7})).toEqual(2)
        expect(count(gt(2), {a: 3, b: 2, c: 7})).toEqual(2)
    })
})
