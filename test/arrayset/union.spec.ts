import {union} from '../../src/arrayset';


/**
 * @author Daniel de Oliveira
 */
describe('union', () => {


    it('union ',() =>
        expect(

            union([[1, 2],[3, 4],[2, 4]]))

            .toEqual([1, 2, 3, 4]));
});
