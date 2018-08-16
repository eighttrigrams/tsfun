import {mapTo} from '../src/utils';


export function main() {

    /**
     * addTo
     *
     * mapTo
     *
     * doWhen
     */
    describe('Arrays/List-Like-Collection', () => {

        // mapTo

        it('mapTo', () =>

            expect(
                mapTo('a.c', [{a: {b: {c: 'd'}}}, {a: {c: {d: 'e'}}}]))

                .toEqual([{d: 'e'}]));
    });
}