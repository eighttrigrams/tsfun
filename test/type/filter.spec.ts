import {Filter} from '../../src/type';
import {filter} from '../../src/array';

/**
 * tsfun | Filter
 */
describe('Filter', () => {

    it('Filter', () => {

        const f: Filter = filter(_ => _ > 2)

        const result = f([3, 2]) as number[]
    })
})
