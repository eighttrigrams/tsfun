import {isFalse, isTrue} from '../../src/predicate';


/**
 * @author Daniel de Oliveira
 */
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