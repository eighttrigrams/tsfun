import {filterMap, mapMap} from "../../src/maps/list_like";

export function main() {

    describe('Maps/List-Like-Collections', () => {

        it('map', () => {

            expect(

                mapMap<number, number>(x => x * 2)({a: 1, b: 2})

            ).toEqual({a: 2, b: 4})
        });


        it('filter', () => {

            expect(

                filterMap((x: number) => x > 1)({a: 1, b: 2})

            ).toEqual({b: 2})
        });
    });
}