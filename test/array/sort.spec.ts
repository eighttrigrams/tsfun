import { sort } from "../../src/array"


const aFirst = (a: string, _: string) => a === 'a' ? -1 : 1


/**
 * tsfun | sort
 */
describe('sort', () => {

    it('sort', () =>
        expect(

            sort(aFirst)(['b', 'a'])

        ).toEqual(['a','b']))


    it('sort - array of numbers - no param', () =>
        expect(

            sort([2, 1])

        ).toEqual([1, 2]))
})
