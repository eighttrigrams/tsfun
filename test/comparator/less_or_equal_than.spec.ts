import {lessOrEqualThan} from '../../src/comparator';


describe('lessOrEqualThan', () => {

    it('false', () =>

        expect(

            lessOrEqualThan(3)(4)

        ).toEqual(false)
    );

    it('equal', () =>

        expect(

            lessOrEqualThan(4)(4)

        ).toEqual(true)
    );


    it('true', () =>

        expect(

            lessOrEqualThan(4)(3)

        ).toEqual(true)
    );


    it('string - false', () =>

        expect(

            lessOrEqualThan('a')('b')

        ).toEqual(false)
    );


    it('string - equal', () =>

        expect(

            lessOrEqualThan('a')('a')

        ).toEqual(true)
    );



    it('string', () =>

        expect(

            lessOrEqualThan('b')('a')

        ).toEqual(true)
    );


    it('compares only single letters', () =>

        expect(

            () => lessOrEqualThan('b')('ab')

        ).toThrow()
    );
});