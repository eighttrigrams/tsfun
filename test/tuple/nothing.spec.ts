import {nothing} from '../../src/tuple'

/**
 * tsfun | nothing
 */
describe('nothing', () => {

    it('nothing', () =>
        expect(

            nothing()

        ).toEqual([]))


    it('typing', () => {

        const e1  = nothing()
        e1[0] = 3; // allowed, since type is Maybe
    })
})
