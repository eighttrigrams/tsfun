import {maybelift, maybe} from '../../src/tuple';
import {flow, mcompose, mmatch, val} from '../../src/composition';
import {map} from '../../src/associative';
import {Maybe} from '../../src/type';

/**
 * tsfun | mmatch
 *
 * @author Daniel de Oliveira
 */
describe('mmatch', () => {

    const safediv = (x: number) => (y: number) => (y === 0 ? [] : [x / y]) as Maybe<number>;
    const div = (x: number) => (y: number) => x / y;
    const square = (x: number) => x * x;


    it('success', () =>

        expect(

            mmatch(square, val(17))([3])

        ).toEqual(9)
    );


    it('failure', () =>

        expect(

            mmatch(square, val(17))([])

        ).toEqual(17)
    );


    it('use with mcompose', () =>

        expect(

            flow(
                [1.5, 0.0, 2.0],
                map(maybe),
                map(mcompose(square, maybelift(div(6)), safediv(3))),
                map(mmatch(square, val(4))))

        ).toEqual([81, 4, 256])
    );
});