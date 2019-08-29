import {flatten} from '../../src/arraylist';


/**
 * @author Daniel de Oliveira
 */
describe('flatten', () => {


    it('flatten', () =>
        expect(

            flatten([[1, 2], [3, 4]])

        ).toEqual([1, 2, 3, 4]));
});
