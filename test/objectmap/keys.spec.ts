import {keys} from '../../src/objectmap';


describe('keys', () => {


    it('demo', () =>
        expect(

            keys({a: 3, b: 4})

        ).toEqual(['a', 'b']))
});