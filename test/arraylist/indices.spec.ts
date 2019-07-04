import {indices} from '../../src/arraylist';

describe('indices', () => {

    it('indices', () =>
        expect(

            indices((x: number) => x > 2)([1, 3, 7, 1])

        ).toEqual([1, 2]));
});