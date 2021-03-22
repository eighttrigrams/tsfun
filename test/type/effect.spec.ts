import {Effect} from '../../src/type';
import {forEach_a} from '../../src/associative';

/**
 * tsfun | Effect
 */
describe('Effect', () => {

    it('Effect', () => {

        const e: Effect<number> = (_: number) => { }

        forEach_a(e)([1, 2, 3])
    })
})
