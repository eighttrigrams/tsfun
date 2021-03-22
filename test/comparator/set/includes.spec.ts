import {includes, on} from '../../../src/comparator'


/**
 * tsfun | includes
 */
describe('includes', () => {

    it('true', () =>
        expect(

            includes(1)([2, 5, 1])

        ).toEqual(true));


    it('false', () =>
        expect(

            includes(7)([2, 5, 1])

        ).toEqual(false))


    it('includesBy', () =>
        expect(

            includes<any>(on('a'), {a: 1})([{a: 1}, {a: 2}])

        ).toEqual(true))
})
