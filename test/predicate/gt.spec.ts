import {gt} from '../../src/predicate';


describe('gt', () => {

   it('true', () =>

       expect(

           gt(3)(4)

       ).toEqual(true)
   );


    it('false', () =>

        expect(

            gt(4)(3)

        ).toEqual(false)
    );


    it('string', () =>

        expect(

            gt('a')('b')

        ).toEqual(true)
    );


    it('string - false', () =>

        expect(

            gt('b')('a')

        ).toEqual(false)
    );


    it('compares only single letters', () =>

        expect(

            () => gt('b')('ab')

        ).toThrow()
    );
});