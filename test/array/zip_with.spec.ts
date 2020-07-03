import {zipWith} from "../../src/array";
import {flow} from '../../src/composition';

/**
 * tsfun | zipWith
 */
describe('zipWith', () => {

    it('base', () =>
        expect(

            flow(
                [1,2],
                zipWith([3,4])
            )

        ).toEqual([[1,3],[2,4]])
    )
});