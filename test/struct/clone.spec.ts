import {clone} from "../../src/struct";
import {isArray, isObject} from '../../src/predicate';

describe('clone', () => {


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


    it('clone string', () => {

        const k = clone('1', fail);
        expect(k).toBe('1');
    });


    it('clone boolean', () => {

        const t = clone(true, fail);
        expect(t).toBe(true);

        const f = clone(false, fail);
        expect(f).toBe(false);
    });


    it('clone number', () => {

        const k = clone(1, fail);
        expect(k).toBe(1);
    });


    it('clone empty Array', () => {

        const k = clone([]);
        expect(k.length).toBe(0);
        expect(isArray(k)).toBe(true);
    });


    it('clone empty Object', () => {

        const k = clone({});
        expect(Object.keys(k).length).toBe(0);
        expect(isObject(k)).toBe(true);
    });


    it('undefined Array item', () => {

        const k = clone([undefined]);
        expect(k.length).toBe(1);
        expect(k[0]).toBe(undefined);
    });


    it('undefined Object item', () => {

        const k = clone({a: undefined});
        expect(Object.keys(k).length).toBe(1);
        expect(k['a']).toBe(undefined);
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
