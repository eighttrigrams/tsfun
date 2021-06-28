import {singleton} from '../../src/tuple';

/**
 * tsfun | singletong
 *
 * @author Daniel de Oliveira
 */
describe('singleton', () => {

    it('singleton', () =>
        expect(

            singleton(3)

        ).toEqual([3])
    );
});