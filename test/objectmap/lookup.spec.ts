import {lookup} from '../../src/objectmap';
import {map} from '../../src/arraylist';

describe('lookup', () => {

    it('lookup', () =>
        expect(

            lookup({a: 9, b: 10})('a')

        ).toEqual(9));



    it('lookup with map', () =>
        expect(

            map(lookup({a: 9, b: 10}))(['a', 'b'])

        ).toEqual([9, 10]));
});