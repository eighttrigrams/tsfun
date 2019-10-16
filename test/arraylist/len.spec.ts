import {len} from '../../src/arraylist';

describe('len', () => {

    it('basic', () =>
        expect(

            len([1, 2])

        ).toBe(2))
});