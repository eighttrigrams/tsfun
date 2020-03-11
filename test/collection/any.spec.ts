import {all, any} from '../../src/collection';
import {greaterThan} from '../../src/comparator';

/**
 * tsfun | any
 *
 * @author Daniel de Oliveira
 */
describe('any', () => {

    it('true', () =>
        expect(

            any(greaterThan(3))([4, 3])

        ).toEqual(true)
    );


    it('false', () =>
        expect(

            any(greaterThan(3))([1, 2])

        ).toEqual(false)
    );
});