import {prune} from '../../src/collection'


/**
 * tsfun | prune
 */
describe('prune', () => {

    it('object', () =>
        expect(

            prune({a: 1, b: undefined})

        ).toEqual({a: 1}))


    it('array', () =>
        expect(

            prune([1, undefined, 2])

        ).toEqual([1, 2]))


    it('string', () =>
        expect(

            prune('a b')

        ).toEqual('ab'))
})
