import {collect} from '../../src/composition'


/**
 * tsfun | collect
 */
describe('collect', () => {

    it('demo', () =>
        expect(

            collect(3, 5, 7)

        ).toEqual([3, 5, 7]))
})
