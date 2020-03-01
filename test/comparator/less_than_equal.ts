import {lessThanEqual} from '../../src/comparator';


describe('lessThanEqual', () => {

    it('false', () =>

        expect(

            lessThanEqual(3)(4)

        ).toEqual(false)
    );

    it('equal', () =>

        expect(

            lessThanEqual(4)(4)

        ).toEqual(true)
    );


    it('true', () =>

        expect(

            lessThanEqual(4)(3)

        ).toEqual(true)
    );


    it('string - false', () =>

        expect(

            lessThanEqual('a')('b')

        ).toEqual(false)
    );


    it('string - equal', () =>

        expect(

            lessThanEqual('a')('a')

        ).toEqual(true)
    );



    it('string', () =>

        expect(

            lessThanEqual('b')('a')

        ).toEqual(true)
    );


    it('compares only single letters', () =>

        expect(

            () => lessThanEqual('b')('ab')

        ).toThrow()
    );
});