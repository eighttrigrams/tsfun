import {isAssociative} from '../../src/predicate'


/**
 * tsfun | isAssociative
 */
describe('isAssociative', () => {

    it('object',() =>
        expect(

            isAssociative({}))

            .toEqual(true))


    it('array',() =>
        expect(

            isAssociative([]))

            .toEqual(true))


    it('null',() =>
        expect(

            isAssociative(null))

            .toEqual(false))
})
