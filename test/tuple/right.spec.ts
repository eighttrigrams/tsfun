import {right} from '../../src/tuple';


describe('left', () => {

    it('right', () =>
        expect(

            right([4, 5])

        ).toEqual(5));


    it('undefined', () =>
        expect(

            () => right([] as any)

        ).toThrowError());
});