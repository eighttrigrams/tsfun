import {map} from '../../src/arraylist';
import {val, cond} from 'tsfun-core';


describe('cond', () => {


   it('cond', () =>
       expect(

           map(cond(
               (_: any) => _ > 3,
               (_: number) => _ * 2,
               val(18)))
           ([3, 4, 5])

       ).toEqual([18, 8, 10]));


   it('pass through', () =>
       expect(

           map(cond(
               (_: any) => _ > 3,
               (_: number) => _ * 2))
           ([3, 4, 5])

       ).toEqual([3, 8, 10]));
});