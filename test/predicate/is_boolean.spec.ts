import {isBoolean} from '../../src/predicate';


describe('isBoolean', () => {

    it('true',() =>
        expect(

            isBoolean(false))

            .toEqual(true));


    it('false',() =>
        expect(

            isBoolean(3))

            .toEqual(false));
});