import {getValue} from '../../src/tuple';

describe('getValue', () => {

    it('Maybe', () =>
        expect(

            getValue([3])

        ).toEqual(3)
    );


    it('Either', () =>
        expect(

            getValue([undefined, 3])

        ).toEqual(3)
    );


    it('Maybe - illegal argument', () =>
        expect(

            () => getValue([])

        ).toThrow()
    );


    it('Either illegal argument', () =>
        expect(

            () => getValue([3, undefined])

        ).toThrow()
    );
});