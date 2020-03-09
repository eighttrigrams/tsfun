import {mmatch} from '../../src/tuple';
import {val} from '../../src/composition';

/**
 * tsfun | mmatch
 *
 * @author Daniel de Oliveira
 */
describe('mmatch', () => {

    const square = (x: number) => x * x;

    it('success', () =>

        expect(

            mmatch([3], square, val(17))

        ).toEqual(9)
    );


    it('failure', () =>

        expect(

            mmatch([], square, val(17))

        ).toEqual(17)
    );
});