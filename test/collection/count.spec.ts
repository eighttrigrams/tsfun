import {greaterThan} from '../../src/comparator';
import {count} from '../../src/collection';


/**
 * tsfun | count
 *
 * It can be used in a flow context, where the arguments are given as separate argument lists,
 * as well as in a standard context, where the arguments are given in a single argument list.
 */
describe('count', () => {

    it('array', () => {

        expect(count(greaterThan(2))([3, 2, 7])).toEqual(2)
        expect(count(greaterThan(2), [3, 2, 7])).toEqual(2)
    })


    it('object', () => {

        expect(count(greaterThan(2))({a: 3, b: 2, c: 7})).toEqual(2)
        expect(count(greaterThan(2), {a: 3, b: 2, c: 7})).toEqual(2)
    })


    it('string', () => {

        expect(count(greaterThan('d'))('abede')).toEqual(2)
        expect(count(greaterThan('d'), 'abede')).toEqual(2)
    })
});