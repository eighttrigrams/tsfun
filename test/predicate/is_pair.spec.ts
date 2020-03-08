import {isPair} from '../../src/predicate';

describe('isPair', () => {

    it('success', () =>
        expect(

            isPair([3, 3])

        ).toEqual(true)
    );


    it('too short', () =>
        expect(

            isPair([])

        ).toEqual(false)
    );


    it('too long', () =>
        expect(

            isPair([1, 2, 3])

        ).toEqual(false)
    );
});