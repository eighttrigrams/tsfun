import {range, zip, materialize} from '../../src/lazy';


/**
 * @author Daniel de Oliveira
 */
describe('lazy/zip', () => {


    it('zip', () => expect(

        materialize(
            zip(
                range(10))(
                ['a', 'b', 'c']))

    ).toEqual([[0, 'a'], [1, 'b'], [2, 'c']]));
});