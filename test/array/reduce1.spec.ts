import {reduce1} from '../../src/array';


describe('reduce1', () => {

   it('reduce1', () =>
       expect(

           reduce1((x: number, y: number) => x + y)([2, 3, 4])

       ).toEqual(9));


   it('too few elements', () =>
       expect(

           () => reduce1((x: number, y: number) => x + y)([])

       ).toThrow());
});