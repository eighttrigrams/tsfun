/**
 * @author Daniel de Oliveira
 */
import {isEmpty, isEven, isOdd, isUndefinedOrEmpty} from '../src/predicates';

export function main() {

    /**
     * isNot
     * not
     *
     * isEven
     * even
     * isOdd
     * odd
     *
     * isDefined
     * defined
     * isUndefined
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

        // isEven

        it('even', () =>
            expect(

                isEven(4))

                .toEqual(true));


        it('even - 0', () =>
            expect(

                isEven(0))

                .toEqual(true));


        it('even - -2', () =>
            expect(

                isEven(0))

                .toEqual(true));

        // isOdd

        it('odd', () =>
            expect(

                isOdd(7))

                .toEqual(true));


        it('odd - -1', () =>
            expect(

                isOdd(-1))

                .toEqual(true))

        // isDefined

        // isUndefined

        // isUndefinedOrEmpty

        it('is an Object', () =>
            expect(

                isUndefinedOrEmpty({}))

                .toEqual(true));


        it('is an Array ', () =>
            expect(

                isUndefinedOrEmpty([]))

                .toEqual(true));


        it('is undefined ', () =>
            expect(

                isUndefinedOrEmpty(undefined as any))

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


        it('an Object', () =>
            expect(

                isEmpty({}))

                .toEqual(true));


        it('is undefined', () =>
            expect(

                () => isEmpty(undefined as any))

                .toThrow());


        it('a number', () =>
            expect(

                () => isEmpty(1))

                .toThrow())


        // isTrue

        // isFalse
    })
}