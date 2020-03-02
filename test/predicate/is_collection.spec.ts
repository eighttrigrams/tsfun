import {isCollection} from '../../src/predicate';


describe('isCollection', () => {

    it('object',() =>
        expect(

            isCollection({}))

            .toEqual(true));


    it('array',() =>
        expect(

            isCollection([]))

            .toEqual(true));


    it('string',() =>
        expect(

            isCollection(''))

            .toEqual(true));


    it('null',() =>
        expect(

            isCollection(null))

            .toEqual(false));
});