import {isFalse, isTrue} from '../../src/predicates';

describe('isTrue / isFalse', () => {

    it('isTrue',() =>
        expect(

            isTrue(true))

            .toEqual(true));


    it('isFalse',() =>
        expect(

            isFalse(false))

            .toEqual(true));
});