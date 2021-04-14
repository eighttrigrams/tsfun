import {Either, Failure, Success} from '../../src/type'


/**
 * tsfun | Either
 */
describe('Either', () => {

    it('Either', () => {

        let e1: Either<string, number> = ['3', undefined]
        const e2: Either = [undefined, 3]
        // wrong - const e3: Either<string, number> = ['3', 4]
        // wrong - const e3: Either<string, number> = ['3']

        const l1: Failure = [1, undefined]
        const r2: Success = [undefined, 1]
    })
})
