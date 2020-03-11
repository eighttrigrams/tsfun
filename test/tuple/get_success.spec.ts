import {getSuccess} from '../../src/tuple';

describe('getSuccess', () => {

    it('Maybe', () =>
        expect(

            getSuccess([3])

        ).toEqual(3)
    );


    it('Either', () =>
        expect(

            getSuccess([undefined, 3])

        ).toEqual(3)
    );


    it('Maybe - illegal argument', () =>
        expect(

            () => getSuccess([])

        ).toThrow()
    );


    it('Either illegal argument', () =>
        expect(

            () => getSuccess([3, undefined])

        ).toThrow()
    );
});