import {success} from '../../src/tuple';
import {Either} from '../../src/type';


describe('success', () => {

    it('success', () =>
        expect(

            success(4)

        ).toEqual([undefined, 4]));


    it('success', () => {

        const e1: Either<string>  = success(4);
        e1[0] = 'abc'
        // wrong - e1[0] = 3
    });
});