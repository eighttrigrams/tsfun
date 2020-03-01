import {lessThan} from '../../src/comparator';


describe('lessThan', () => {

    it('false', () =>

        expect(

            lessThan(3)(4)

        ).toEqual(false)
    );


    it('true', () =>

        expect(

            lessThan(4)(3)

        ).toEqual(true)
    );


    it('ltring - false', () =>

        expect(

            lessThan('a')('b')

        ).toEqual(false)
    );


    it('ltring', () =>

        expect(

            lessThan('b')('a')

        ).toEqual(true)
    );


    it('compares only single letters', () =>

        expect(

            () => lessThan('b')('ab')

        ).toThrow()
    );
});