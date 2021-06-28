import {err} from '../../src/tuple'


/**
 * tsfun | err
 */
describe('err', () => {

    it('Maybe', () =>
        expect(

            err([])

        ).toEqual(undefined)
    )


    it('Either', () =>
        expect(

            err([1, undefined])

        ).toEqual(1)
    )


    it('Maybe - illegal argument', () =>
        expect(

            () => err([3] as any)

        ).toThrow()
    )


    it('Either illegal argument', () =>
        expect(

            () => err([undefined, 3] as any)

        ).toThrow()
    )
})
