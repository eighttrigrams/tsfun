import {isDefined} from "tsfun-core";


describe('isDefined', () => {

    it('isDefined',() =>
        expect(

            isDefined(true))

            .toEqual(true));
});