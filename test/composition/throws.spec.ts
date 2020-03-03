import {throws} from '../../src/composition';

describe('throws', () => {

   it('throws', () =>

       expect(

           () => throws('e')()

       ).toThrow('e')
   )
});