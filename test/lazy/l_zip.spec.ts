import {lRange, lZip, materialize} from '../../src/lazy'


/**
 * tsfun | lZip
 */
describe('lZip', () => {

    it('zip', () => expect(

        materialize(
            lZip(
                lRange(10))(
                ['a', 'b', 'c']))

    ).toEqual([[0, 'a'], [1, 'b'], [2, 'c']]));
})
