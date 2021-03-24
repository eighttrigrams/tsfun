import {liftE} from '../../src/tuple'
import {cond, mcompose, throws, val} from '../../src/composition'
import {map} from '../../src/associative'
import {is} from '../../src/comparator'


/**
 * tsfun | liftE
 *
 * liftEither
 */
describe('liftE', () => {

    const square = (x: number) => x * x

    it('success', () =>

        expect(

            liftE(val(3))(17)

        ).toEqual([undefined, 3])
    )


    it('failure', () =>

        expect(

            liftE(throws(3))(19)

        ).toEqual([3, undefined])
    )


    it('accept varargs', () =>

        expect(

            liftE((x: number, y: number) => x + y)(17, 19)

        ).toEqual([undefined, 36])
    )


    it('use with mcompose', () =>

        expect(

            map(mcompose(liftE(cond(is(1.5), throws(3))), liftE(square)))
            ([[undefined, 1.5], [undefined, 0], [undefined, 2]])

        ).toEqual([[3, undefined],[undefined, 0],[undefined, 4]])
    )
})
