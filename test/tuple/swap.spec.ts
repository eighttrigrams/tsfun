import {swap} from '../../src/tuple';


describe('swap', () => {

    it('swap', () =>
        expect(

            swap([33, '3'])

        ).toEqual(['3', 33]));
});