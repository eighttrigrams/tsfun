import {isObject} from '../../src/predicate'


/**
 * tsfun | isObject
 * 
 * Whether an entity is an Object ist checked by
 *
 * o instanceof Object && o.constructor === Object
 *
 * which accounts for `Object` and `{}`, but not Descendants of `Object`, like for example
 * `Date`, which is what we want in the context of ***tsfun's*** functionality.
 */
describe('isObject', () => {

    it('isObject', () =>
        expect(

            isObject({}))

            .toEqual(true))


    it('null', () =>
        expect(

            isObject(null))

            .toEqual(false))
})
