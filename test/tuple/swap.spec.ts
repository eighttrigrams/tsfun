import {swap} from '../../src/tuple'
import {Either, Pair} from '../../src/type'


/**
 * tsfun | swap
 */
describe('swap', () => {

    it('swap', () =>
        expect(

            swap([33, '3'])

        ).toEqual(['3', 33]))


    it('swap typing', () => {

        const p1: Pair<string, number> = ['a', 2]
        const p2: Pair<number, string> = swap(p1)

        // wrong
        // const p2: Pair<string, number> = swap(p1)
    });


    it('swap typing - with either', () => {

        const p1: Either<string, string> = ['a', undefined]
        const p2: Either<string, string> = swap(p1)

        // works if both type args are of the same type
    })
})
