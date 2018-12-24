import {biggerThan, smallerThan} from '../../src/comparator';


/**
 * @author Daniel de Oliveira
 */
describe('smallerThan / biggerThan', () => { // TODO rename to greaterThan

    it('biggerThan',() =>
        expect(

            biggerThan(2)(3))

            .toEqual(true));


    it('smallerThan',() =>
        expect(

            smallerThan(3)(2))

            .toEqual(true));
});
