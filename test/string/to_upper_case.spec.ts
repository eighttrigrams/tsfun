import {toUpperCase} from '../../src/string';

describe('toUpperCase', () => {

    it('toUpperCase', () =>
        expect(

            toUpperCase('abc')

        ).toEqual('ABC'));
});