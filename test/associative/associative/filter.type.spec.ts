import {Filter} from '../../../src/associative';
import { filter1 } from '../../../src/associative';

/**
 * tsfun/associative | Filter
 */
describe('associative/Filter', () => {

    it('Filter', () => {

        const f1: Filter<number> = filter1(_ => _ > 2)
        const result1 = f1([1, 2]) as number[]

        const f2: Filter<string> = filter1(_ => _.length > 1)
        const result2 = f2(['a', 'ab']) as string[]
    })
})
