import {duplicates} from '../../src/arrayset';


/**
 * @author Daniel de Oliveira
 */
describe('duplicates', () => {

    it('duplicates ',() =>
        expect(

            duplicates([3, 3, 1, 4, 3, 1]))

            .toEqual([3, 1]));
});
