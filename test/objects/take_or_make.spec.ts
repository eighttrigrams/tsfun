import {takeOrMake} from '../../src/objects';

describe('takeOrMake', () => {


    // takeOrMake

    it('takeOrMake makes', () => {

        const obj: any = { };
        expect(takeOrMake(obj, 'a.b.c', [])).toEqual([]);
        expect(obj['a']['b']['c']).toEqual([]);
    });


    it('takeOrMake takes', () =>
        expect(

            takeOrMake({a:{ b: { c: 'a'}}}, 'a.b.c', []))

            .toEqual('a'));
});