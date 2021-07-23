import {lt} from '../../src/comparator';
import {separate} from '../../src/array';


/**
 * tsfun | separate
 */
describe('separate', () => {

    it('array', () => {

        expect(separate(lt(3))([2, 3, 1, 3, 4])).toEqual([[2, 1], [3, 3, 4]])
        expect(separate(lt(3), [2, 3, 1, 3, 4])).toEqual([[2, 1], [3, 3, 4]])
        expect(separate([2, 3, 1, 3, 4], lt(3))).toEqual([[2, 1], [3, 3, 4]])
    })


    it('array - with i', () =>

        expect(

            separate((_v: number, i: number) => i < 3)([2, 3, 1, 3, 4]))

            .toEqual([[2, 3, 1], [3, 4]]))
})
