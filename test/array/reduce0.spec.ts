import {reduce0} from '../../src/array'


/**
 * tsfun | reduce0
 */
describe('reduce0', () => {

   it('reduce0', () =>
       expect(

           reduce0((x: number, y: number) => x + y)([2, 3, 4])

       ).toEqual(9))


   it('too few elements', () =>
       expect(

           () => reduce0((x: number, y: number) => x + y)([])

       ).toThrow())
})
