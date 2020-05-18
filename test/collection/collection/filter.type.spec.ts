import {filter, Filter} from '../../../src/collection';

/**
 * tsfun/collection | Filter
 */
describe('collection/Filter', () => {

    it('Filter', () => {

        const f1: Filter<number> = filter(_ => _ > 2)
        const result1 = f1([1, 2]) as number[]

        const f2: Filter<string> = filter(_ => _.length > 1)
        const result2 = f2(['a', 'ab']) as string[]

        const f3: Filter = filter(_ => _ > 'a')
        const result3 = f3('abc') as string
    })
})
