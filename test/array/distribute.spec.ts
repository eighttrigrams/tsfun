import {gt, lt} from '../../src/comparator'
import {Map, Pair} from '../../src/type'
import { identity } from '../../src/core'
import { distribute } from '../../src/array'


/**
 * tsfun | distribute
 */
describe('distribute', () => {

    it('base case', () =>

        expect(

                distribute(identity)(['2', '2', '3']))

            .toEqual({ '2': ['2', '2'], '3': ['3']}))


    it('base case', () =>

        expect(

            distribute((_: number) => _.toString())([2, 2, 3]))

            .toEqual({ '2': [2, 2], '3': [3]}))


    it('single argument list', () =>

        expect(

            distribute(['2', '2', '3'], identity))

            .toEqual({ '2': ['2', '2'], '3': ['3']}))


    it('single argument list - with numbers list', () =>

        expect(

            distribute([2, 2, 3], _ => _.toString()))

            .toEqual({ '2': [2, 2], '3': [3]}))


    it('single argument list - different order', () =>

        expect(

            distribute(identity, ['2', '2', '3']))

            .toEqual({ '2': ['2', '2'], '3': ['3']}))
})
