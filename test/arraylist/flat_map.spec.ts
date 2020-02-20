import {flatMap} from '../../src/arraylist';


/**
 * @author Daniel de Oliveira
 */
describe('flatMap', () => {


    it('basic', () =>
        expect(

            flatMap((x: string) => x.split(' '))(['a b', 'c d']))

            .toEqual(['a', 'b', 'c', 'd']));


    it('empty', () =>
        expect(

            flatMap((x: string) => x.split(' '))([]))

            .toEqual([]));


    it('one - two', () =>
        expect(

            flatMap((x: string) => x.split(' '))(['a b']))

            .toEqual(['a', 'b']));


    it('one - one', () =>
        expect(

            flatMap((x: string) => x.split(' '))(['a']))

            .toEqual(['a']));


    it('type A to type B', () =>
        expect(

            flatMap((_: number) => ['l', 'l'])([3, 4]))

            .toEqual(['l', 'l', 'l', 'l']));
});
