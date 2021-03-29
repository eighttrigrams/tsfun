import {Filter, filter} from '../../src/associative'


/**
 * tsfun | Filter
 */
describe('Filter', () => {

    it('Filter', () => {

        const f1: Filter<number> = filter((_: number) => _ > 2)
        const result1 = f1([1, 2]) as number[]

        const f2: Filter<string> = filter((_: string) => _.length > 1)
        const result2 = f2(['a', 'ab']) as string[]
    })
})
