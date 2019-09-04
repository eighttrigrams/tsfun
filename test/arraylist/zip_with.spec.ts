import {zipWith} from "../../src/arraylist";

describe('zipWith', () => {


    it('zipWith', () => expect(

        zipWith(
            (x: number, y: number) => x + y,
            [1, 2])
        ([3, 4, 5])

    ).toEqual([4, 6]))
});