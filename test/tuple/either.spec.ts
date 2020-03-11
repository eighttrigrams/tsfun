import {either} from '../../src/tuple';
import {Either} from '../../src/type';


describe('either', () => {

    it('either', () =>
        expect(

            either(4)

        ).toEqual([undefined, 4]));


    it('typing', () => {

        const e1: Either<string>  = either(4);
        e1[0] = 'abc'
        // wrong - e1[0] = 3
    });
});