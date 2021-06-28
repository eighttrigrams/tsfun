import {pipe} from '../../src/composition'


/**
 * tsfun | pipe
 */
describe('pipe', () => {

    const add2 = (a, b) => a + b
    const add3 = (a, b, c) => a + b + c
    const add4 = (a, b, c, d) => a + b + c + d


    it('pipe - 2 args', () =>

        expect(

            pipe(add2, '1')('2')

        ).toBe('21')
    )


    it('pipe - 3 args', () =>

        expect(

            pipe(add3, '1', '2')('3')

        ).toBe('312')
    )


    it('pipe - 4 args', () =>

        expect(

            pipe(add4, 1, 2, 3)(4)

        ).toBe(10)
    )
})
