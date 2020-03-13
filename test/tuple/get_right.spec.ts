import {getRight} from '../../src/tuple';

/**
 * tsfun | getRight
 *
 * @author Daniel de Oliveira
 */
describe('getRight', () => {

    it('getRight', () =>
        expect(

            getRight([4, 5])

        ).toEqual(5));


    it('undefined', () =>
        expect(

            () => getRight([] as any)

        ).toThrow());
});