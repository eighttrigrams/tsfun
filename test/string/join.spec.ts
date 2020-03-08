import {join} from '../../src/string';

describe('join', () => {

    it('join', () =>
        expect(

            join('')(['a', 'b', 'c'])

        ).toEqual('abc'));
});