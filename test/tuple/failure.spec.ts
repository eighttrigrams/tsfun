import {failure} from '../../src/tuple';
import {Either} from '../../src/type';


describe('failure', () => {

    it('success', () =>
        expect(

            failure(4)

        ).toEqual([4, undefined]));


    it('failure', () => {

        const e1: Either<number>  = failure(4);
        e1[0] = 5
        // wrong - e1[0] = '3'
    });
});