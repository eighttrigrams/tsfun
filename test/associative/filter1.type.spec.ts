import {Filter1} from '../../src/associative'
import { filter_a } from '../../src/associative'


/**
 * tsfun | Filter1
 */
describe('Filter1', () => {

    it('Filter1', () => {

        const f1: Filter1<number> = filter_a(_ => _ > 2)
        const result1 = f1([1, 2]) as number[]

        const f2: Filter1<string> = filter_a(_ => _.length > 1)
        const result2 = f2(['a', 'ab']) as string[]
    })
})