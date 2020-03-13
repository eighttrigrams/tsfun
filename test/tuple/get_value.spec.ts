import {getValue} from '../../src/tuple';

/**
 * tsfun | getValue
 *
 * @author Daniel de Oliveira
 */
describe('getValue', () => {

    it('getValue', () =>
        expect(

            getValue([4])

        ).toEqual(4));
});