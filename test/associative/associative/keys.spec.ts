import {keys} from '../../../src/associative';


/**
 * tsfun/associative | keys
 */
describe('keys', () => {

    it('object', () =>
        expect(

            keys({a: 3, b: 4})

        ).toEqual(['a', 'b']))


    it('array', () =>
        expect(

            keys(['a', 'b'])

        ).toEqual([0, 1]))


    it('typing', () => {

        const result1 = keys(['a', 'b']) as number[]
        const result2 = keys({a: 'b'}) as string[]
    })
})