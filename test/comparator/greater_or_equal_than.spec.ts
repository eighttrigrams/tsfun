import {greaterOrEqualThan} from '../../src/comparator';


describe('greaterOrEqualThan', () => {

    it('true', () =>

        expect(

            greaterOrEqualThan(3)(4)

        ).toEqual(true)
    );

    it('equal', () =>

        expect(

            greaterOrEqualThan(4)(4)

        ).toEqual(true)
    );


    it('false', () =>

        expect(

            greaterOrEqualThan(4)(3)

        ).toEqual(false)
    );


    it('string', () =>

        expect(

            greaterOrEqualThan('a')('b')

        ).toEqual(true)
    );


    it('string - equal', () =>

        expect(

            greaterOrEqualThan('a')('a')

        ).toEqual(true)
    );



    it('string - false', () =>

        expect(

            greaterOrEqualThan('b')('a')

        ).toEqual(false)
    );


    it('compares only single letters', () =>

        expect(

            () => greaterOrEqualThan('b')('ab')

        ).toThrow()
    );
});