import {isMaybe} from '../../src/predicate';

describe('isMaybe', () => {

    it('success', () =>
        expect(

            isMaybe([3])

        ).toEqual(true)
    );


    it('failure', () =>
        expect(

            isMaybe([])

        ).toEqual(true)
    );


    it('too long', () =>
        expect(

            isMaybe([1, 2])

        ).toEqual(false)
    );
});