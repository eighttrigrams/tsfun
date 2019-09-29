import {range} from '../../src/arraylist';


describe('range', () => {

    it('up to', () => expect(

        range(3)

    ).toEqual([0, 1, 2]));


    it('from to', () => expect(

        range(1, 3)

    ).toEqual([1, 2]));


    it('step size', () => expect(

        range(1, 7, 3)

    ).toEqual([1, 4]));
});