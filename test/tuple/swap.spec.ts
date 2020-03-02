import {swap} from '../../src/tuple';


describe('swap', () => {

    it('swap', () =>
        expect(

            swap([33, '3'])

        ).toEqual(['3', 33]));


    // TODO type checking seems not to work as expected, this passes
    // it('', () =>
    //     expect(
    //
    //         swap(['3', 33])
    //
    //     ).toEqual(['3', 33]));
});