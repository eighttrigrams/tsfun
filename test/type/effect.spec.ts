import {Effect} from '../../src/type';
import {forEach1} from '../../src/associative';

/**
 * tsfun | Effect
 */
describe('Effect', () => {

    it('Effect', () => {

        const e: Effect<number> = (_: number) => { }

        forEach1(e)([1, 2, 3])
    })
})
