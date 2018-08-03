

/**
 * @author Daniel de Oliveira
 */
import {flatMap, mapTo} from "../../src/arrays/coll";

export function main() {

    describe('Arrays/Collection', () => {

        it('mapTo', () =>
            expect(mapTo('a.c')([{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}]))
                .toEqual([{d: 'e'}]));


        it('flatMap', () =>
            expect(flatMap((x: string) => x.split(' '))(['a b', 'c d']))
                .toEqual(['a', 'b', 'c', 'd']));


        it('flatMap - empty', () =>
            expect(flatMap((x: string) => x.split(' '))([]))
                .toEqual([]));


        it('flatMap - one - two', () => {

            expect(

                flatMap((x: string) => x.split(' '))(['a b'])

            ).toEqual(['a', 'b'])
        });


        it('flatMap - one - one', () => {

            expect(

                flatMap((x: string) => x.split(' '))(['a'])

            ).toEqual(['a'])
        });
    });
}