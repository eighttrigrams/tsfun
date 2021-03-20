import {just} from '../../src/tuple'


/**
 * tsfun | just
 */
describe('just', () => {

    it('just', () =>
        expect(

            just(4)

        ).toEqual([4]))


    it('typing', () => {

        const e1  = just(4)
        e1[0] = 3

        // wrong - e1[0] = 'abc'
    })
})
