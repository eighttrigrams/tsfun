import {keysAndValues} from '../../src/objectmap';


describe('keysAndValues', () => {


    it('demo', () =>
        expect(

            keysAndValues({a: 3, b: 4})

        ).toEqual([['a', 3], ['b', 4]]))
});