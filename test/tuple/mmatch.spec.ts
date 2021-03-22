import {liftM, just} from '../../src/tuple'
import {flow, mcompose, mmatch, val} from '../../src/composition'
import {map_a} from '../../src/associative'
import {Maybe} from '../../src/type'


/**
 * tsfun | mmatch
 */
describe('mmatch', () => {

    const safediv = (x: number) => (y: number) => (y === 0 ? [] : [x / y]) as Maybe<number>
    const div = (x: number) => (y: number) => x / y
    const square = (x: number) => x * x


    it('success', () =>

        expect(

            mmatch(square, val(17))([3])

        ).toEqual(9)
    )


    it('failure', () =>

        expect(

            mmatch(square, val(17))([])

        ).toEqual(17)
    )


    it('use with mcompose', () =>

        expect(

            flow(
                [1.5, 0.0, 2.0],
                map_a(just),
                map_a(mcompose(safediv(3), liftM(div(6)), liftM(square))),
                map_a(mmatch(square, val(4))))

        ).toEqual([81, 4, 256])
    )
})
