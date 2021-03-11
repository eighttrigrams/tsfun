import {greaterThan, lessThan} from '../../src/comparator'
import {distribute} from '../../src/array'
import {Map, Pair} from '../../src/type'
import { identity } from '../../src/core'


/**
 * tsfun | distribute
 */
fdescribe('distribute', () => {

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
