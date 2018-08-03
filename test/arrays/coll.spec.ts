

/**
 * @author Daniel de Oliveira
 */
import {flatMap} from "../../src/arrays/arrays";

export function main() {

    describe('Arrays/Collection', () => {

        it('flatMap', () => {

            expect(

                flatMap((x: string) => x.split(' '))(['a b', 'c d'])

            ).toEqual(['a', 'b', 'c', 'd'])
        });


        it('flatMap - empty', () => {

            expect(

                flatMap((x: string) => x.split(' '))([])

            ).toEqual([])
        });


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