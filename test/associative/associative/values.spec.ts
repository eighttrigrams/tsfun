import {values} from '../../../src/associative';


/**
 * tsfun/associative | values
 */
describe('values', () => {

    it('object', () =>
        expect(

            values({a: 3, b: 4})

        ).toEqual([3, 4]))


    it('array', () =>
        expect(

            values({a: 3, b: 4})

        ).toEqual([3, 4]))
})