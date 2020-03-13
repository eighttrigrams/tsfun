import {pair} from '../../src/tuple';

/**
 * tsfun | pair
 *
 * @author Daniel de Oliveira
 */
describe('pair', () => {

    it('pair', () =>
        expect(

            pair(3, 'a')

        ).toEqual([3, 'a'])
    );
});