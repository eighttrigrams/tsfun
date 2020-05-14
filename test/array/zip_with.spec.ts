import {zipWith} from "../../src/array";

/**
 * tsfun | zipWith
 */
describe('zipWith', () => {

    it('multiple argument lists', () => expect(

        zipWith((x: number, y: number) => x + y, [1, 2])([3, 4, 5])

    ).toEqual([4, 6]))


    it('single argument list - 2', () => expect(

        zipWith((x: number, y: number) => x + y, [1, 2], [3, 4, 5])

    ).toEqual([4, 6]))


    it('3 arguments', () => expect(

        zipWith((x: number, y: number, z: number) => x + y + z, [1, 2], [3, 4, 5], [1, 1, 1])

    ).toEqual([5, 7]))


    it('4 arguments or more', () => expect(

        zipWith((x: number, y: number, z: number, a: number) => x + y + z + a, [1, 2], [3, 4, 5], [1, 1, 1], [1, 1, 1])

    ).toEqual([6, 8]))


    it('5 arguments', () => expect(

        zipWith((x: number, y: number, z: number, a: number, b: number) => x + y + z + a + b, [1, 2], [3, 4, 5], [1, 1, 1], [1, 1, 1], [1])

    ).toEqual([7]))
});