import {nothing} from '../../src/tuple'
import { Nothing } from '../../src/type'

/**
 * tsfun | nothing
 */
describe('nothing', () => {

    it('nothing', () =>
        expect(

            nothing()

        ).toEqual([]))


    it('typing', () => {

        const e1: Nothing  = nothing()
    })
})
