import {ste} from '../../src/predicate';


describe('ste', () => {

    it('false', () =>

        expect(

            ste(3)(4)

        ).toEqual(false)
    );

    it('equal', () =>

        expect(

            ste(4)(4)

        ).toEqual(true)
    );


    it('true', () =>

        expect(

            ste(4)(3)

        ).toEqual(true)
    );


    it('string - false', () =>

        expect(

            ste('a')('b')

        ).toEqual(false)
    );


    it('string - equal', () =>

        expect(

            ste('a')('a')

        ).toEqual(true)
    );



    it('string', () =>

        expect(

            ste('b')('a')

        ).toEqual(true)
    );


    it('compares only single letters', () =>

        expect(

            () => ste('b')('ab')

        ).toThrow()
    );
});