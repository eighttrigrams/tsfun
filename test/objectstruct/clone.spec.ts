import {clone, jsonClone} from "../../src/objectstruct";

describe('clone / jsonClone', () => {


    it('clone shallow Object', () => {

        const k = clone({a: '1', b: 2});
        expect(k['a']).toBe('1'); // string
        expect(k['b']).toBe(2); // number
    });


    it('clone shallow Array', () => {

        const k = clone(['1', 2]);
        expect(k[0]).toBe('1'); // string
        expect(k[1]).toBe(2); // number
    });


    it('clone nested Object', () => {

        const nested = {c: 3};
        const k = clone({a: '1', b: nested});
        expect(k['b']['c']).toBe(3);
        expect(k['b']).not.toBe(nested);
    });


    it('clone nested Array', () => {

        const nested = [3];
        const k = clone([nested]);
        expect(k[0][0]).toBe(3);
        expect(k[0]).not.toBe(nested);
    });


    it('clone mutually nested Array', () => {

        const nested = [3];
        const k = clone([{a: nested}]);
        expect(k[0]['a'][0]).toBe(3);
        expect(k[0]['a']).not.toBe(nested);
    });


    it('clone mutually nested Object', () => {

        const nested = {c: 3};
        const k = clone({a: [nested]});
        expect(k['a'][0]['c']).toBe(3);
        expect(k['a'][0]).not.toBe(nested);
    });


    it('clone date with jsonClone', () => {

        const d = new Date();
        const dJsonCloned = jsonClone(d);

        const k = clone([d]);
        expect(k[0]).toEqual(dJsonCloned);
    });


    it('clone date with helper', () => {

        const d = new Date();

        const k = clone([d], (item: any) => {
            expect(item).toBe(d);
            return new Date(d);
        });
        expect(k[0].toString()).toEqual(d.toString());
        expect(k[0] instanceof Date).toBe(true);
        expect(k[0]).not.toBe(d);
    });
});
