import {lRange, lZip, materialize} from '../../src/arraylist_lazy';


/**
 * @author Daniel de Oliveira
 */
describe('lZip', () => {


    it('lZip', () => expect(

        materialize(
            lZip(
                lRange(10))(
                ['a', 'b', 'c']))

    ).toEqual([[0, 'a'], [1, 'b'], [2, 'c']]));
});