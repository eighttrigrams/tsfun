import {split} from '../../src/string';

describe('split', () => {

    it('split', () =>
        expect(

            split('')('abc')

        ).toEqual(['a', 'b', 'c']));
});