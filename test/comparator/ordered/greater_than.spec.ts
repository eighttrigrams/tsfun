import {greaterThan} from '../../../src/comparator';


describe('greaterThan', () => {

   it('true', () =>

       expect(

           greaterThan(3)(4)

       ).toEqual(true)
   );


    it('false', () =>

        expect(

            greaterThan(4)(3)

        ).toEqual(false)
    );


    it('string', () =>

        expect(

            greaterThan('a')('b')

        ).toEqual(true)
    );


    it('string - false', () =>

        expect(

            greaterThan('b')('a')

        ).toEqual(false)
    );


    it('compares only single letters', () =>

        expect(

            () => greaterThan('b')('ab')

        ).toThrow()
    );
});