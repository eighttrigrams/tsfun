/**
 * @author Daniel de Oliveira
 */
import {isEmpty, isUndefinedOrEmpty} from '../src/predicates';

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