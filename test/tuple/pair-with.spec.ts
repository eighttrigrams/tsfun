import {pairWith} from '../../src/tuple';


describe('pairWith', () => {

    it('pairWith', () =>
        expect(

            pairWith((x: number) => x * 2)(2)

        ).toEqual([2,4]));
});