import {eitherval} from '../../src/tuple';

/**
 * tsfun | eitherval
 *
 * @author Daniel de Oliveira
 */
describe('eitherval', () => {

    it('demo', () =>

        expect(

            eitherval(3)()

        ).toEqual([undefined, 3])
    );
});