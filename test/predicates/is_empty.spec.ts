/**
 * @author Daniel de Oliveira
 */
import {empty, isEmpty, isNot} from '../../src/predicates';

/**
 * isNot
 * not
 *
 * isDefined
 * defined
 * isUndefined
 *
 * has
 *
 * isUndefinedOrEmpty
 * undefinedOrEmpty
 * isEmpty
 * empty
 *
 * isTrue
 * isFalse
 *
 * isArray
 * isObject
 */
describe('empty/isEmpty', () => {

    // isEmpty

    it('an Array ', () =>
        expect(

            isEmpty([]))

            .toEqual(true));


    it('a non-empty Array ', () =>
        expect(

            isEmpty([1]))

            .toEqual(false));


    it('an Object', () =>
        expect(

            isEmpty({}))

            .toEqual(true));


    it('a non-empty Object', () =>
        expect(

            isEmpty({a: 1}))

            .toEqual(false));


    it('a non-empty string', () =>
        expect(

            isEmpty(''))

            .toEqual(true));


    it('a string', () =>
        expect(

            isEmpty('1'))

            .toEqual(false));


    it('is undefined', () =>
        expect(

            () => isEmpty(undefined as any))

            .toThrow());


    it('a number', () =>
        expect(

            () => isEmpty(1))

            .toThrow());


    it('a string - us with is not', () =>
        expect(

            isNot(empty)('1'))

            .toEqual(true));


    // isTrue

    // isFalse
});