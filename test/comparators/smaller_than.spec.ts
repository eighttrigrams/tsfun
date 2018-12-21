import {biggerThan, smallerThan} from '../../src/comparators';

describe('smallerThan / biggerThan', () => {

    // sameOn

    it('biggerThan',() =>
        expect(

            biggerThan(2)(3))

            .toEqual(true));


    it('smallerThan',() =>
        expect(

            smallerThan(3)(2))

            .toEqual(true));
});