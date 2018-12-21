import {isObject} from '../../src/predicates';

describe('isObject', () => {

// Whenever we talk about javascript entities, we highlight the terms as code, like
// for instance, `object`, `{}`, `Object`, and `Array`.
//
// Wether an entity is an Object ist checked by
//
// o instanceof Object && o.constructor === Object
//
// which accounts for `Object` and `{}`, but not Descendants of `Object`, like for example
// `Date`, which is what we want in the context of ***tsfun's*** functionality.


    it('isObject',() =>
        expect(

            isObject({}))

            .toEqual(true));
});