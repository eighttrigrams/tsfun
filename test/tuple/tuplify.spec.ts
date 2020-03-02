import {tuplify} from '../../src/tuple';


describe('tuplify', () => {

    it('tuplify', () =>
        expect(

            tuplify((x: number) => x * 3, (x: number) => x - 1)(2)

        ).toEqual([6,1]));
});