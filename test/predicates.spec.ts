/**
 * @author Daniel de Oliveira
 */
import {empty, has, isEmpty, isNot, isUndefinedOrEmpty} from '../src/predicates';

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
describe('Predicates', () => {

    // isNot

    // isDefined

    // isUndefined

    // has

    it('has - true', () =>
        expect(

            has('a.b')({a: {b: 1}}))

            .toEqual(true));


    it('has - false', () =>
        expect(

            has('a.c')({a: {b: 1}}))

            .toEqual(false));

    // isUndefinedOrEmpty


    it('is a non-empty Object', () =>
        expect(

            isUndefinedOrEmpty({a: 1}))

            .toEqual(false));


    it('is an Object', () =>
        expect(

            isUndefinedOrEmpty({}))

            .toEqual(true));


    it('is an non-empty Array ', () =>
        expect(

            isUndefinedOrEmpty([1]))

            .toEqual(false));


    it('is an Array ', () =>
        expect(

            isUndefinedOrEmpty([]))

            .toEqual(true));


    it('is undefined ', () =>
        expect(

            isUndefinedOrEmpty(undefined as any))

            .toEqual(true));

    it('is a string non-empty string', () =>
        expect(

            isUndefinedOrEmpty('a'))

            .toEqual(false));


    it('is a string ', () =>
        expect(

            isUndefinedOrEmpty(''))

            .toEqual(true));


    it('a number', () =>
        expect(

            () => isUndefinedOrEmpty(1))

            .toThrow());


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