/**
 * @author Daniel de Oliveira
 */
import {isUndefinedOrEmpty} from '../../src/predicate';


/**
 * @author Daniel de Oliveira
 */
describe('isUndefinedOrEmpty', () => {


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
});