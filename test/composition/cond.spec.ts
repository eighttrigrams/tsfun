import {map} from '../../src/associative';
import {cond, val} from '../../src/composition';


describe('cond', () => {


   it('cond', () =>
       expect(

           map(cond(
               (_: any) => _ > 3,
               (_: number) => _ * 2,
               val(18)))
           ({a: 3, b: 4, c: 5})

       ).toEqual({a: 18, b: 8, c: 10}));


   it('pass through', () =>
       expect(

           map(cond(
               (_: any) => _ > 3,
               (_: number) => _ * 2))
           ([3, 4, 5])

       ).toEqual([3, 8, 10]));


   it('cond boolean', () =>
       expect(

           map(cond(
               true,
               (_: number) => _ * 2))
           ([3, 4, 5])

       ).toEqual([6, 8, 10]));
});