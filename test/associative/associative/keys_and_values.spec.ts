import {keysAndValues} from '../../../src/associative';


describe('keysAndValues', () => {

    it('array', () =>
        expect(

            keysAndValues({a: 3, b: 4})

        ).toEqual([['a', 3], ['b', 4]]));


    it('array', () =>
        expect(

            keysAndValues(['a', 'b'])

        ).toEqual([[0, 'a'], [1, 'b']]))
});