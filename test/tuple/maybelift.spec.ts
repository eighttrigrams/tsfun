import {maybelift} from '../../src/tuple';
import {cond, mcompose, throws, val} from '../../src/composition';
import {map} from '../../src/associative';
import {is} from '../../src/comparator';


/**
 * tsfun | maybelift
 *
 * @author Daniel de Oliveira
 */
describe('maybelift', () => {

    const square = (x: number) => x * x;

    it('success', () =>

        expect(

            maybelift(val(3))([17])

        ).toEqual([3])
    );


    it('failure', () =>

        expect(

            maybelift(throws(3))([19])

        ).toEqual([])
    );


    it('use with mcompose', () =>

        expect(

            map(mcompose(square, maybelift(cond(is(1.5), throws(3)))))([[1.5], [0], [2]])

        ).toEqual([[],[0],[4]])
    );
});