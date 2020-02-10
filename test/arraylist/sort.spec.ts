import {sort} from '../../src/arraylist';

describe('sort', () => {

    it('sort', () =>
        expect(

            sort((a: string, _: string) => a === 'a' ? -1 : 1)(['b', 'a'])

        ).toEqual(['a','b']));
});