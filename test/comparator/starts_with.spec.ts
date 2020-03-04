import {startsWith} from '../../src/comparator';


describe('startsWith', () => {

    it('string - true', () =>

        expect(

            startsWith('def')('defg')

        ).toBe(true)
    );


    it('string - false', () =>

        expect(

            startsWith('def')('dae')

        ).toBe(false)
    );


    it('array - true', () =>

        expect(

            startsWith([1, 2, 3])([1, 2, 3, 4])

        ).toBe(true)
    );


    it('array - same elements, same size', () =>

        expect(

            startsWith(['a', 'b', 'c'])(['a', 'b', 'c'])

        ).toBe(true)
    );


    it('array - false - too short', () =>

        expect(

            startsWith([1, 2, 3])([1, 2])

        ).toBe(false)
    );


    it('array - wrong', () =>

        expect(

            startsWith([1, 2])([3])

        ).toBe(false)
    );


    it('array - zero length', () =>

        expect(

            startsWith([])([])

        ).toBe(true)
    );
});