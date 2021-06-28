import {curry} from '../../src/composition'


/**
 * tsfun | curry
 */
describe('curry', () => {

    const add2 = (a, b) => a + b
    const add3 = (a, b, c) => a + b + c


    it('curry - 0', () =>

        expect(

            curry(add2, '2')('3')

        ).toBe('23')
    )


    it('curry - 1', () =>

        expect(

            curry(add3, '2', '3')('4')

        ).toBe('234')
    )
})
