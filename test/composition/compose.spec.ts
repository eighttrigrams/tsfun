import {compose, flow} from '../../src/composition'
import {drop, dropRight, take} from '../../src/array'


/**
 * tsfun | compose
 *
 * supports type inference for up to 10 function args
 */
describe('compose', () => {

    it('basic case', () =>
        expect(

            compose(take(1))([5, 6]))

            .toEqual([5]));


    it('nest', () =>
        expect(

            flow(
                [5, 6, 8, 9],
                compose(
                    drop(1),
                    dropRight(1),
                    compose(
                        dropRight(1)))))

            .toEqual([6]));


    // intended use case
    //
    // const evenAndSmallerThan6 = flowP(
    //     filter(smallerThan(6)),
    //     filter(even())
    // flow(
    //     [1, 2, 3, 4, 6, 7, 8],
    //     evenAndSmallerThan6,
    //     take(1))
    //     .includes(2)
    //
    // -> true

    it('typing', () => {

        const result1: number = compose(parseInt)('3')
        // const result2: number = compose(parseInt)(3) // WRONG
        // const result: string = compose(parseInt)('3') // WRONG

        const result2: string =
            compose(parseInt, _ => _.toString())('3')
        // const result: number = // WRONG
        //     compose(parseInt, _ => _.toString())('3')

        const result3: number =
            compose(
                parseInt,
                _ => _.toString(),
                parseInt)
            ('3')

        // const result: string = // WRONG
        //     compose(
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt)
        //     ('3')

        const result4: string =
            compose(
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString())
            ('3')

        // const result: number = // WRONG
        //     compose(
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString())
        //     ('3')

        const result5: number =
            compose(
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt)
            ('3')

        // const result: string = // WRONG
        //     compose(
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt)
        //     ('3')

        const result6: string =
            compose(
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString())
            ('3')

        // const result: number = // WRONG
        //     compose(
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString())
        //     ('3')

        const result7: number =
            compose(
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt)
            ('3')

        // const result: string = // WRONG
        //     compose(
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt)
        //     ('3')

        const result8: string =
            compose(
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString())
            ('3')

        // const result: number = // WRONG
        //     compose(
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString())
        //     ('3')

        const result9: number =
            compose(
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt)
            ('3')

        // const result: string = // WRONG
        //     compose(
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt)
        //     ('3')

        const result10: string =
            compose(
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString())
            ('3')

        // const result: number = // WRONG
        //     compose(
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString(),
        //         parseInt,
        //         _ => _.toString())
        //     ('3')

        const result11: number =
            compose(
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt)
            ('3')

        const result: string =
            compose(
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt,
                _ => _.toString(),
                parseInt)               // not inferred anymore, result is typed to any
            ('3')
    })
})
