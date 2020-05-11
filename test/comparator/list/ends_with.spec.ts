import {endsWith} from '../../../src/comparator';


/**
 * tsfun | endsWith
 */
describe('endsWith', () => {

    it('string - true', () => {

        expect(endsWith('efg')('defg')).toBe(true)
        expect(endsWith('efg', 'defg')).toBe(true)
    });


    it('string - false', () =>

        expect(

            endsWith('def')('dae')

        ).toBe(false)
    );


    it('array - true', () =>

        expect(

            endsWith([2, 3, 4])([1, 2, 3, 4])

        ).toBe(true)
    );


    it('array - same elements, same size', () =>

        expect(

            endsWith(['a', 'b', 'c'])(['a', 'b', 'c'])

        ).toBe(true)
    );


    it('array - false - too short', () =>

        expect(

            endsWith([2, 3, 4])([1, 2])

        ).toBe(false)
    );


    it('array - wrong', () =>

        expect(

            endsWith([1, 2])([3])

        ).toBe(false)
    );


    it('array - zero length', () =>

        expect(

            endsWith([])([])

        ).toBe(true)
    );
});