import {isArray} from "../../src/predicate";

/**
 * If an entity is an Array is determined
 * by checking
 * Array.isArray
 */
describe('isArray', () => {

    it('isArray',() =>
        expect(

            isArray([]))

            .toEqual(true));
});