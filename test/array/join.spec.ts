import {join} from '../../src/array'


/**
 * tsfun | join
 */
describe('join', () => {

    it('join', () =>
        expect(

            join('')(['a', 'b', 'c'])

        ).toEqual('abc'))
})
