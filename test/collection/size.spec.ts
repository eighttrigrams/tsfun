import {size} from '../../src/collection'


/**
 * tsfun | size
 */
describe('size', () => {

    it('object', () =>
        expect(

            size({a: 3, b: 4})

        ).toEqual(2))


    it('array', () =>
        expect(

            size(['a', 'b'])

        ).toEqual(2))


    it('string', () =>
        expect(

            size('abc')

        ).toEqual(3))
})
