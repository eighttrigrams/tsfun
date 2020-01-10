import {isDefined} from "../../src/predicate";


describe('isDefined', () => {

    it('isDefined',() =>
        expect(

            isDefined(true))

            .toEqual(true));
});