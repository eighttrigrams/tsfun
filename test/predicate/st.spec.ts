import {st} from '../../src/predicate';


describe('st', () => {

    it('false', () =>

        expect(

            st(3)(4)

        ).toEqual(false)
    );


    it('true', () =>

        expect(

            st(4)(3)

        ).toEqual(true)
    );


    it('string - false', () =>

        expect(

            st('a')('b')

        ).toEqual(false)
    );


    it('string', () =>

        expect(

            st('b')('a')

        ).toEqual(true)
    );


    it('compares only single letters', () =>

        expect(

            () => st('b')('ab')

        ).toThrow()
    );
});