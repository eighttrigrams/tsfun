import {getLeft} from '../../src/tuple';

/**
 * tsfun | getLeft
 *
 * @author Daniel de Oliveira
 */
describe('getLeft', () => {

    it('getLeft', () =>
        expect(

            getLeft([4, 5])

        ).toEqual(4));


    it('undefined', () =>
        expect(

            () => getLeft([] as any)

        ).toThrow());
});