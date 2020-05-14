import {range, zip, materialize} from '../../../src/lazy';


/**
 * @author Daniel de Oliveira
 */
describe('lazy/Range', () => {

    it('up to', () =>
        expect(

            materialize(range(0, 3))

        ).toEqual([0, 1, 2]));


    it('from to', () =>
        expect(

            materialize(range(3, 7))

        ).toEqual([3, 4, 5, 6]));


    it('step size', () =>
        expect(

            materialize(range(3, 7, 3))

        ).toEqual([3, 6]));


    it('use case', () =>
        expect(

            materialize(zip(range(10))(['a', 'b', 'c']))

        ).toEqual([[0, 'a'], [1, 'b'], [2, 'c']]))
});