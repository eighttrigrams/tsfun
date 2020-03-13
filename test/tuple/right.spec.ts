import {right} from '../../src/tuple';

/**
 * tsfun | right
 *
 * @author Daniel de Oliveira
 */
describe('right', () => {

    it('right', () =>
        expect(

            right([4, 5])

        ).toEqual(5));


    it('undefined', () =>
        expect(

            () => right([] as any)

        ).toThrow());
});