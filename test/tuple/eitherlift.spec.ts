import {eitherlift} from '../../src/tuple';
import {cond, mcompose, throws, val} from '../../src/composition';
import {map} from '../../src/associative';
import {is} from '../../src/comparator';


/**
 * tsfun | eitherlift
 *
 * @author Daniel de Oliveira
 */
describe('eitherlift', () => {

    const square = (x: number) => x * x;

    it('success', () =>

        expect(

            eitherlift(val(3))([17])

        ).toEqual([undefined, 3])
    );


    it('failure', () =>

        expect(

            eitherlift(throws(3))([19])

        ).toEqual([3, undefined])
    );


    it('use with mcompose', () =>

        expect(

            map(mcompose(square, eitherlift(cond(is(1.5), throws(3)))))([[undefined, 1.5], [undefined, 0], [undefined, 2]])

        ).toEqual([[3, undefined],[undefined, 0],[undefined, 4]])
    );
});