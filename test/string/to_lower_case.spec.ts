import {toLowerCase} from '../../src/string';

describe('toLowerCase', () => {

    it('toLowerCase', () =>
        expect(

            toLowerCase('ABC')

        ).toEqual('abc'));
});