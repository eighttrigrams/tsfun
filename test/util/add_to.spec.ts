import {addTo} from '../../src/util';


/**
 * @author Daniel de Oliveira
 */
describe('addTo', () => {

    it('addTo', () => {

        const as = [1, 2];
        addTo(as)(3);
        expect(as)
            .toEqual([1, 2, 3]);
    });
});