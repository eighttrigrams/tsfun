import {flatMap} from '../../src/array';


/**
 * @author Daniel de Oliveira
 */
fdescribe('flatMap', () => {

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


    it('single argument list', () =>
        expect(

            flatMap([3, 4], _ => ['l', 'l']))

            .toEqual(['l', 'l', 'l', 'l']));


    it('single argument list - different order', () =>
        expect(

            flatMap(_ => ['l', 'l'], [3, 4]))

            .toEqual(['l', 'l', 'l', 'l']));
});
