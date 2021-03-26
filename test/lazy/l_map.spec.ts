import {lMap, materialize} from '../../src/lazy'


/**
 * tsfun | lMap
 */
describe('lMap', () => {

    it('map', () => expect(

        materialize(lMap((x: number) => x * x)([4, 2, 1]))

    ).toEqual([16, 4, 1]))
})
