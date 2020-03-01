import {isString} from '../../src/predicate';


describe('isString', () => {

    it('true',() =>
        expect(

            isString('abc'))

            .toEqual(true));


    it('false',() =>
        expect(

            isString(3))

            .toEqual(false));
});