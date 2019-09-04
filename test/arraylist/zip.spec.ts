import {zip} from "../../src/arraylist";

describe('zip', () => {


    it('zip', () => expect(

        zip([1, 2])(['a', 'b', 'c'])

    ).toEqual([[1, 'a'], [2, 'b']]))
});