import {maybeval} from '../../src/tuple';

/**
 * tsfun | maybeval
 *
 * @author Daniel de Oliveira
 */
describe('maybeval', () => {

    it('demo', () =>

        expect(

            maybeval(3)()

        ).toEqual([3])
    );
});