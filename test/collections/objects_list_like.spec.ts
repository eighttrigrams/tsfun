import {filterObject, mapObject} from '../../src/collections/objects_list_like';

export function main() {

    describe('Maps/List-Like-Collections', () => {

        it('map', () => {

            expect(

                mapObject<number, number>(x => x * 2)({a: 1, b: 2})

            ).toEqual({a: 2, b: 4})
        });


        it('filter', () => {

            expect(

                filterObject((x: number) => x > 1)({a: 1, b: 2})

            ).toEqual({b: 2})
        });
    });
}