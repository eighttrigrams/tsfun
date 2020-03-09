import {mmatch} from '../../src/tuple';
import {val} from '../../src/composition';

/**
 * tsfun | mmatch
 *
 * @author Daniel de Oliveira
 */
describe('mmatch', () => {

    const square = (x: number) => x * x;

    it('mmatch - success', () =>

        expect(

            mmatch([3], square, val(17))

        ).toEqual(9)
    );


    it('mmatch - failure', () =>

        expect(

            mmatch([], square, val(17))

        ).toEqual(17)
    );
});