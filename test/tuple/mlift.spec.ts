import {mcompose, mlift} from '../../src/tuple';
import {cond, throws, val} from '../../src/composition';
import {map} from '../../src/associative';
import {is} from '../../src/comparator';


/**
 * tsfun | mlift
 *
 * @author Daniel de Oliveira
 */
describe('mlift', () => {

    const square = (x: number) => x * x;

    it('success', () =>

        expect(

            mlift(val(3))([17])

        ).toEqual([3])
    );


    it('failure', () =>

        expect(

            mlift(throws(3))([19])

        ).toEqual([])
    );


    it('use with mcompose', () =>

        expect(

            map(mcompose(square, mlift(cond(is(1.5), throws(3)))))([[1.5], [0], [2]])

        ).toEqual([[],[0],[4]])
    );
});