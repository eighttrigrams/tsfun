import {gte} from '../../src/predicate';


describe('gte', () => {

    it('true', () =>

        expect(

            gte(3)(4)

        ).toEqual(true)
    );

    it('equal', () =>

        expect(

            gte(4)(4)

        ).toEqual(true)
    );


    it('false', () =>

        expect(

            gte(4)(3)

        ).toEqual(false)
    );


    it('string', () =>

        expect(

            gte('a')('b')

        ).toEqual(true)
    );


    it('string - equal', () =>

        expect(

            gte('a')('a')

        ).toEqual(true)
    );



    it('string - false', () =>

        expect(

            gte('b')('a')

        ).toEqual(false)
    );


    it('compares only single letters', () =>

        expect(

            () => gte('b')('ab')

        ).toThrow()
    );
});