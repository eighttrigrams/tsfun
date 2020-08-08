import {apply, flow} from '../../src/composition';
import {map, zip} from '../../src/array';

/**
 * tsfun | apply
 */
describe('apply', () => {

    it('base', () =>
        expect(

            apply((x: number, y: number) => x + y)([1, 2])

        ).toEqual(3))


    it('use case - with zip', () =>
        expect(

            flow(
                [[1,2],[3,4]],
                zip(apply((x: number, y: number) => x + y)))

        ).toEqual([4,6])
    )


    it('use case - with map', () =>
        expect(

            flow(
                [[1,2],[3,4]],
                map(apply((x: number, y: number) => x + y)))

        ).toEqual([3,7])
    )


    it('typing', () => {

        const typing: number = apply((x: number, y: number) => x + y)([[1,2],[3,4]])
    })
})