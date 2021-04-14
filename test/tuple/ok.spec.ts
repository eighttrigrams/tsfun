import {ok} from '../../src/tuple'


/**
 * tsfun | ok
 */
describe('ok', () => {

    it('Maybe', () =>
        expect(

            ok([3])

        ).toEqual(3)
    )


    it('Either', () =>
        expect(

            ok([undefined, 3])

        ).toEqual(3)
    )


    it('Maybe - illegal argument', () =>
        expect(

            () => ok([])

        ).toThrow()
    )


    it('Either illegal argument', () =>
        expect(

            () => ok([3, undefined])

        ).toThrow()
    )
})
