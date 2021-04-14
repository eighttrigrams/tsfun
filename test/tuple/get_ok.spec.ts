import {getOk} from '../../src/tuple'


/**
 * tsfun | getOk
 */
describe('getOk', () => {

    it('Maybe', () =>
        expect(

            getOk([3])

        ).toEqual(3)
    )


    it('Either', () =>
        expect(

            getOk([undefined, 3])

        ).toEqual(3)
    )


    it('Maybe - illegal argument', () =>
        expect(

            () => getOk([])

        ).toThrow()
    )


    it('Either illegal argument', () =>
        expect(

            () => getOk([3, undefined])

        ).toThrow()
    )
})
