import {isList} from '../../src/predicate';


describe('isList', () => {

    it('array',() =>
        expect(

            isList([]))

            .toEqual(true));


    it('string',() =>
        expect(

            isList('string'))

            .toEqual(true));


    it('null',() =>
        expect(

            isList(null))

            .toEqual(false));
});