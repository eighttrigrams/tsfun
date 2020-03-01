import {zip} from "../../src/arraylist";


describe('zip', () => {

    it('base case', () => expect(

        zip([1, 2])(['a', 'b'])

    ).toEqual([[1, 'a'], [2, 'b']]));


    it('one list longer than the other', () => expect(

        zip([1, 2])(['a', 'b', 'c'])

    ).toEqual([[1, 'a'], [2, 'b']]));


    it('string', () => expect(

        zip('de')('fg')

    ).toEqual(['df', 'eg']));


    it('number array and string', () => expect(

        zip([3, 4])('fg')

    ).toEqual([[3, 'f'], [4, 'g']]));


    it('string and number array', () => expect(

        zip('fg')([3, 4])

    ).toEqual([['f', 3], ['g', 4]]));
});