import {map} from '../../src/arraylist';
import {conditionally, value} from '../../src/composition';


describe('conditionally', () => {


   it('conditionally', () =>
       expect(

           map(conditionally(
               _ => _ > 3,
               (_: number) => _ * 2,
               value(18)))
           ([3, 4, 5])

       ).toEqual([18, 8, 10]));


   it('pass through', () =>
       expect(

           map(conditionally(
               _ => _ > 3,
               (_: number) => _ * 2))
           ([3, 4, 5])

       ).toEqual([3, 8, 10]));
});