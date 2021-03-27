import {L, R} from '../../src/tuple';
import {is, on} from '../../src/comparator';

/**
 * tsfun | RIGHT
 */
describe('RIGHT', () => {

    it('RIGHT', () =>
        expect(

            on(R, is(4))([1, 4])

        ).toEqual(true));


    it('RIGHT - nested', () =>
        expect(

            on([R, L], is(3))([1, [3, 7]])

        ).toEqual(true));
});
