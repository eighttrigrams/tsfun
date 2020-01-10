/**
 * @author Daniel de Oliveira
 */
import {isEmpty} from "../../src/predicate";


describe('isEmpty', () => {

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
});