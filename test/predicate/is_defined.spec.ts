import {defined, isDefined, isUndefined, Undefined} from '../../src/predicate';


describe('isDefined / defined / isUndefined / Undefined', () => {

    it('isDefined',() =>
        expect(

            isDefined(true))

            .toEqual(true));


    it('defined',() =>
        expect(

            defined(true))

            .toEqual(true));


    it('isFalse',() =>
        expect(

            isUndefined(undefined))

            .toEqual(true));


    it('isFalse',() =>
        expect(

            Undefined(undefined))

            .toEqual(true));
});