import {values} from '../../src/objectmap';


describe('values', () => {


    it('demo', () =>
        expect(

            values({a: 3, b: 4})

        ).toEqual([3, 4]))
});