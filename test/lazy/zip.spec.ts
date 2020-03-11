import {range as lRange, zip as lZip, materialize} from '../../src/lazy';


/**
 * tsfun | lazy/zip
 *
 * @author Daniel de Oliveira
 */
describe('lazy/zip', () => {

    it('zip', () => expect(

        materialize(
            lZip(
                lRange(10))(
                ['a', 'b', 'c']))

    ).toEqual([[0, 'a'], [1, 'b'], [2, 'c']]));
});