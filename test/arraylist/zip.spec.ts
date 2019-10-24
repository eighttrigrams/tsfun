import {zip} from "../../src/arraylist";

describe('zip', () => {


    it('base case', () => expect(

        zip([1, 2])(['a', 'b'])

    ).toEqual([[1, 'a'], [2, 'b']]));


    it('one list longer than the other', () => expect(

        zip([1, 2])(['a', 'b', 'c'])

    ).toEqual([[1, 'a'], [2, 'b']]))
});