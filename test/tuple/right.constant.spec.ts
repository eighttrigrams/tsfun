import {LEFT, RIGHT} from '../../src/tuple';
import {is, on} from '../../src/comparator';

/**
 * tsfun | RIGHT
 */
describe('RIGHT', () => {

    it('RIGHT', () =>
        expect(

            on(RIGHT, is(4))([1, 4])

        ).toEqual(true));


    it('RIGHT - nested', () =>
        expect(

            on([RIGHT, LEFT], is(3))([1, [3, 7]])

        ).toEqual(true));
});