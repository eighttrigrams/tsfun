import {greaterThanEqual} from '../../src/comparator';


describe('greaterThanEqual', () => {

    it('true', () =>

        expect(

            greaterThanEqual(3)(4)

        ).toEqual(true)
    );

    it('equal', () =>

        expect(

            greaterThanEqual(4)(4)

        ).toEqual(true)
    );


    it('false', () =>

        expect(

            greaterThanEqual(4)(3)

        ).toEqual(false)
    );


    it('string', () =>

        expect(

            greaterThanEqual('a')('b')

        ).toEqual(true)
    );


    it('string - equal', () =>

        expect(

            greaterThanEqual('a')('a')

        ).toEqual(true)
    );



    it('string - false', () =>

        expect(

            greaterThanEqual('b')('a')

        ).toEqual(false)
    );


    it('compares only single letters', () =>

        expect(

            () => greaterThanEqual('b')('ab')

        ).toThrow()
    );
});