import {xor} from '../../src/predicate';
import {is, isnt} from '../../src/comparator';


describe('xor', () => {


    it('true', () =>
        expect(

            xor(is(3), is(4))(4)

        ).toBe(true));


    it('false', () =>
        expect(

            xor(is(3), isnt(4))(4)

        ).toBe(false));
});