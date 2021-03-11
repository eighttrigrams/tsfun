import {greaterThan, lessThan} from '../../src/comparator'
import {Map, Pair} from '../../src/type'
import { identity } from '../../src/core'
import { distribute, kwlistToMap } from '../../src/kwlist'


/**
 * tsfun | kwListToMap
 */
describe('kwListToMap', () => {

    it('kwListToMap', () => 

        expect(
            
            kwlistToMap([['a', 'b'], ['c', 'd']]))
            
            .toEqual({ a: 'b', c: 'd' }))
})
