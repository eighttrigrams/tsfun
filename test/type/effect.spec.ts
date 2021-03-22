import {Effect} from '../../src/type';
import { forEach } from '../../src/array';

/**
 * tsfun | Effect
 */
describe('Effect', () => {

    it('Effect', () => {

        const e: Effect<number> = (_: number) => { }

        forEach(e)([1, 2, 3])
    })
})
