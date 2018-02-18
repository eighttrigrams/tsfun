import {filter, map} from '../../src/objects/coll';

/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Collections/Objects', () => {

        it('map', () => {

            expect(

                map<number, number>(x => x * 2)({a: 1, b: 2})

            ).toEqual({a: 2, b: 4})
        });


        it('filter', () => {

            expect(

                filter((x: number) => x > 1)({a: 1, b: 2})

            ).toEqual({b: 2})
        });
    });
}