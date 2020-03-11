import {is} from '../../src/comparator';
import {or} from '../../src/predicate';


describe('or', () => {


    it('true', () =>
        expect(

           or(is(1), is(2))  (1)

        ).toBe(true));


    it('false', () =>
        expect(

            or(is(7), is(2))  (1)

        ).toBe(false));


    it('three args', () =>
        expect(

            or(is(1), is(2), is(3))  (3)

        ).toBe(true));
});