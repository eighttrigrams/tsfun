import {pair} from '../../src/tuple';

/**
 * tsfun | singletong
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