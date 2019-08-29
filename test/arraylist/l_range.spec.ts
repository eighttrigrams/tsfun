import {lRange, lZip, materialize} from '../../src/arraylist_lazy';


/**
 * @author Daniel de Oliveira
 */
describe('lRange', () => {


    it('lRange', () => {

        materialize(lZip(lRange(10))(['a', 'b', 'c']));
    });
});