import {getElForPathIn, takeOrMake} from "../../src/objects/objects";

/**
 * @author Daniel de Oliveira
 */
export function main() {

    describe('Objects', () => {

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