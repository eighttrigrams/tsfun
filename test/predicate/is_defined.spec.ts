import {defined, isDefined} from '../../src/predicate'


/**
 * tsfun | isDefined | defined
 */
describe('isDefined', () => {

    it('isDefined',() =>
        expect(

            isDefined(true))

            .toEqual(true))

    it('defined',() =>
        expect(

            defined(true))

            .toEqual(true))
})
