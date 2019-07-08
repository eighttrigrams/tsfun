import {flatMap, flatten} from '../../src/arraylist';


/**
 * @author Daniel de Oliveira
 */
describe('flatMap / flatten', () => {


    it('flatMap', () =>
        expect(

            flatMap((x: string) => x.split(' '))(['a b', 'c d']))

            .toEqual(['a', 'b', 'c', 'd']));


    it('flatMap - empty', () =>
        expect(

            flatMap((x: string) => x.split(' '))([]))

            .toEqual([]));


    it('flatMap - one - two', () =>
        expect(

            flatMap((x: string) => x.split(' '))(['a b']))

            .toEqual(['a', 'b']));


    it('flatMap - one - one', () =>
        expect(

            flatMap((x: string) => x.split(' '))(['a']))

            .toEqual(['a']));


    it('flatten', () =>
        expect(

            flatten([[1, 2], [3, 4]])

        ).toEqual([1, 2, 3, 4]));
});
