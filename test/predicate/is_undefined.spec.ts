import {isUndefined} from "tsfun-core";


describe('isUndefined', () => {


    it('isFalse',() =>
        expect(

            isUndefined(undefined))

            .toEqual(true));
});