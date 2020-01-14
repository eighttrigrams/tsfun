import {isAssociative, isObject} from '../../src/predicate';

describe('isAssociative', () => {

    it('object',() =>
        expect(

            isAssociative({}))

            .toEqual(true));


    it('array',() =>
        expect(

            isAssociative([]))

            .toEqual(true));


    it('null',() =>
        expect(

            isAssociative(null))

            .toEqual(false));
});