import {greaterThan, lessThan} from '../../src/comparator'
import {Map, Pair} from '../../src/type'
import { identity } from '../../src/core'
import { distribute } from '../../src/kwlist'


/**
 * tsfun | distribute
 */
describe('distribute', () => {

    it('numbers', () => 

        expect(
            
            distribute(identity)([2, 2, 3]))
            
            .toEqual([[2, [2, 2]], [3, [3]]]))


    it('strings', () => 

        expect(
                
                distribute(identity)(['2', '2', '3']))
                
            .toEqual([['2', ['2', '2']], ['3', ['3']]]))


    it('single argument list', () => 

        expect(
        
            distribute([2, 2, 3], identity))
        
            .toEqual([[2, [2, 2]], [3, [3]]]))


    it('single argument list - different order', () => 

        expect(
        
            distribute(identity, [2, 2, 3]))
            
            .toEqual([[2, [2, 2]], [3, [3]]]))
})
