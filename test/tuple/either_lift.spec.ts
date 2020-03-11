import {eitherLift} from '../../src/tuple';
import {cond, mcompose, throws, val} from '../../src/composition';
import {map} from '../../src/associative';
import {is} from '../../src/comparator';


/**
 * tsfun | eitherlift
 *
 * @author Daniel de Oliveira
 */
describe('eitherLift', () => {

    const square = (x: number) => x * x;

    it('success', () =>

        expect(

            eitherLift(val(3))(17)

        ).toEqual([undefined, 3])
    );


    it('failure', () =>

        expect(

            eitherLift(throws(3))(19)

        ).toEqual([3, undefined])
    );


    it('accept varargs', () =>

        expect(

            eitherLift((x: number, y: number) => x + y)(17, 19)

        ).toEqual([undefined, 36])
    );


    it('use with mcompose', () =>

        expect(

            map(mcompose(square, eitherLift(cond(is(1.5), throws(3)))))([[undefined, 1.5], [undefined, 0], [undefined, 2]])

        ).toEqual([[3, undefined],[undefined, 0],[undefined, 4]])
    );
});