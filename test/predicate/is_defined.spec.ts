import {defined, isDefined, isUndefined} from '../../src/predicate';


describe('isDefined', () => {

    it('isDefined',() =>
        expect(

            isDefined(true))

            .toEqual(true));
});