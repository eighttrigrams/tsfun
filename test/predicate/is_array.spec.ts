import {isArray} from '../../src/predicate';


describe('isArray', () => {

    // If an entity is an Array is determined
    // by checking
    // as instanceof Array

    it('isArray',() =>
        expect(

            isArray([]))

            .toEqual(true));
});