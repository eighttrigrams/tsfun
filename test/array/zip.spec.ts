import {map, zip} from "../../src/array"
import {collect, flow} from '../../src/composition'

/**
 * tsfun | zip
 */
describe('zip', () => {

    it('base', () =>
        expect(

            zip([1,2,4], [3,4,5])

        ).toEqual([[1,3],[2,4],[4,5]])
    )


    it('shorter', () =>
        expect(

            zip([1,2], [3,4,5])

        ).toEqual([[1,3],[2,4]])
    )


    it('two args', () =>
        expect(

            zip([1,2], [3,4])

        ).toEqual([[1,3],[2,4]])
    )


    it('one argument list', () =>
        expect(

            zip([[1,2], [3,4]])

        ).toEqual([[1,3],[2,4]])
    )


    it('zipper - two argument lists', () =>
        expect(

            zip<number>(([x,y]) => x + y)([[1,2], [3,4]])

        ).toEqual([4,6])
    )


    it('empty argument lists', () =>
        expect(

            zip<number>()([[1,2], [3,4]])

        ).toEqual([[1,3],[2,4]])
    )


    it('typing', () => {

        const result1: Array<Array<number>> = zip([[1,2],[3,4]])
        const result2: Array<Array<number>> = flow([[1,2],[3,4]], zip())
        const result3: Array<number> = flow([[1,2],[3,4]], zip(([x,y]) => x + y))

        const result5: Array<number> = flow([[1,2],[3,4]], zip(apply((x: number, y: number) => x + y)))
    })


    // TODO maybe make public, make typed version for various numbers of parameters
    function apply(f: any) {

        return (args: any[]) => f.apply(undefined, args)
    }


    it('composition - apply with zip', () =>
        expect(

            flow(
                [[1,2],[3,4]],
                zip(apply((x: number, y: number) => x + y)))

        ).toEqual([4,6])
    )


    it('composition - apply with map', () =>
        expect(

            flow(
                [[1,2],[3,4]],
                map(apply((x: number, y: number) => x + y)))

        ).toEqual([3,7])
    )


    it('composition 1a', () =>
        expect(

            flow([[1,2],[3,4]], zip())

        ).toEqual([[1,3],[2,4]])
    )


    it('composition 1', () =>
        expect(

            flow([[1,2],[3,4]], zip)

        ).toEqual([[1,3],[2,4]])
    )


    it('composition 2', () =>
        expect(

            flow([[3,4], [5,7]], zip(([x,y]) => x + y))

        ).toEqual([8,11])
    )


    it('zipper - single collection', () => expect(

        zip(([x, y]) => x + y, [[1, 2], [3, 4, 5]])

    ).toEqual([4, 6]))


    it('zipper - multiple collections', () => expect(

        zip((x: number, y: number) => x + y, [1, 2], [3, 4, 5])

    ).toEqual([4, 6]))


    it('with - 3 arguments', () => expect(

        zip((x: number, y: number, z: number) => x + y + z, [1, 2], [3, 4, 5], [1, 1, 1])

    ).toEqual([5, 7]))


    it('with - 4 arguments or more', () => expect(

        zip((x: number, y: number, z: number, a: number) => x + y + z + a, [1, 2], [3, 4, 5], [1, 1, 1], [1, 1, 1])

    ).toEqual([6, 8]))


    // it('with - 5 arguments', () => expect(
    //
    //     zip((x: number, y: number, z: number, a: number, b: number) => x + y + z + a + b, [1, 2], [3, 4, 5], [1, 1, 1], [1, 1, 1], [1])
    //
    // ).toEqual([7]))
})
