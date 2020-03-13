import {value} from '../../src/tuple';
import {Singleton} from '../../src/type';

/**
 * tsfun | value
 *
 * @author Daniel de Oliveira
 */
describe('value', () => {

    it('value', () =>
        expect(

            value([4] as Singleton<number>)

        ).toEqual(4));
});