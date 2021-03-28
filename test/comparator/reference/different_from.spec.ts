import {differentFrom, equal} from '../../../src/comparator'


/**
 * tsfun | differentFrom
 */
describe('differentFrom', () => {


    it('differentFrom', () =>
        expect(

            differentFrom({a: 1})({a: 1})

        ).toEqual(true))


    it('comparator', () =>
        expect(

            differentFrom(equal, {a: {b: 2, c: 3}})({a: {b: 2, c: 3}})

        ).toEqual(false))
})
