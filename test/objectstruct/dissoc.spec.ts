import {dissoc} from '../../src/objectstruct';

describe('dissoc', () => {


    it('dissoc - first layer', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = { a: 'a_val', c: embeddedStruct };
        const resultStruct = dissoc('c')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(embeddedStruct['d']).toBe('d_val');
        expect(objectStruct['a']).toBe('a_val');
        expect(resultStruct['c']).toBeUndefined();
    });


    it('dissoc - second layer', () => {

        const embeddedStruct = { e: 'e_val' };

        const objectStruct = { a: { b: 'b_val', c: embeddedStruct}, d: embeddedStruct };
        const resultStruct = dissoc('a.c')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['d']).toBe(embeddedStruct);
        expect(resultStruct['a']['c']).toBeUndefined();
        expect(resultStruct['a']['b']).toBe('b_val');
        expect(objectStruct['a']['c']).toBe(embeddedStruct);
        expect(embeddedStruct['e']).toBe('e_val');
    });
});