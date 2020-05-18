import {lessThan} from '../../src/comparator'
import {filter} from '../../src/array'
import {flow} from '../../src/composition';


/**
 * tsfun | filter
 */
describe('filter', () => {

    it('multiple argument lists', () =>
        expect(

            filter(lessThan(4))([2, 4, 3])

        ).toEqual([2, 3])
    )


    it('to be used in composition', () =>
        expect(

            flow(
            [2, 4, 3]
            , filter(lessThan(4))
            )

        ).toEqual([2, 3])
    )


    it('index provided as second parameter', () => {

        expect(

            filter((_, i) => i !== 1)([17, 19, 22]))

            .toEqual([17, 22])
    })


    it('typing', () => {

        const result1 = filter(_ => true)
        // const result: number = filter(_ => true)('a') // WRONG
        // const result: number = filter(_ => true) // WRONG
    })
})
