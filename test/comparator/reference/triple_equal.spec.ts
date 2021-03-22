import {tripleEqual} from '../../../src/comparator'


/**
 * tsfun | tripleEqual
 * 
 * tripleEqual unsurprisingly uses comparison via `===`.
 * and can for example be used with filter
 */
describe('tripleEqual', () => {


    it('tripleEqual',() =>
        expect(

            tripleEqual('a')('a'))

            .toEqual(true))


    it('tripleEqual not equal',() =>
        expect(

            tripleEqual('a')('b'))

            .toEqual(false))
})
