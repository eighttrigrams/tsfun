import {isUndefined} from "../../src/predicate";


describe('isUndefined', () => {


    it('isFalse',() =>
        expect(

            isUndefined(undefined))

            .toEqual(true));
});