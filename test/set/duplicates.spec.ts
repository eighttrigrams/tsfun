import {duplicates} from '../../src/set';


/**
 * @author Daniel de Oliveira
 */
describe('duplicates', () => {

    it('duplicates ',() =>
        expect(

            duplicates([3, 3, 1, 4, 3, 1]))

            .toEqual([3, 1]));
});
