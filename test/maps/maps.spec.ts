import {getElForPathIn, takeOrMake} from "../../src/objects/objects";
import {map, filter} from "../../src/maps/coll";

/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Maps', () => {

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


        it('returns el', () => {

            expect(getElForPathIn({a:{ b: { c: 'a'}}}, 'a.b.c')).toEqual('a');
        });


        it('returns undefined', () => {

            expect(getElForPathIn({a:{ }}, 'a.b.c')).toEqual(undefined);
        });


        it('takeOrMake makes', () => {

            const obj: any = { };
            expect(takeOrMake(obj, 'a.b.c', [])).toEqual([]);
            expect(obj['a']['b']['c']).toEqual([]);
        });


        it('takeOrMake takes', () => {

            expect(takeOrMake({a:{ b: { c: 'a'}}}, 'a.b.c', [])).toEqual('a');
        });
    });
}