import {xor} from '../../src/predicate';
import {is, isnt} from '../../src/comparator';


/**
 * tsfun | xor
 *
 * @author Daniel de Oliveira
 */
describe('xor', () => {

    it('true', () =>
        expect(

            xor(is(3), is(4))(4)

        ).toBe(true));


    it('false', () =>
        expect(

            xor(is(3), isnt(4))(4)

        ).toBe(false));


    it('multiargs true', () =>
        expect(

            xor(is(3), isnt(4), isnt(5))(4)

        ).toBe(true));


    it('multiargs false', () =>
        expect(

            xor(is(4), is(4), is(3))(4)

        ).toBe(false));
});