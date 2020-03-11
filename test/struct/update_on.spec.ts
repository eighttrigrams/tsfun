import {updateOn} from '../../src/struct';


describe('updateOn', () => {

    it('update - first layer', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = { a: 'a_val', c: embeddedStruct };
        const resultStruct = updateOn('a', (val: string) => val + '_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['a']).toBe('a_val_new');
        expect(resultStruct['c']).toBe(embeddedStruct);

        // changes
        resultStruct['a'] = 'a_val_changed';
        expect(objectStruct['a']).toBe('a_val');
    });


    it('update - first layer - by array', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = { a: 'a_val', c: embeddedStruct };
        const resultStruct = updateOn(['a'], (val: string) => val + '_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['a']).toBe('a_val_new');
        expect(resultStruct['c']).toBe(embeddedStruct);

        // changes
        resultStruct['a'] = 'a_val_changed';
        expect(objectStruct['a']).toBe('a_val');
    });


    it('update - second layer', () => {

        const embeddedStruct = { e: 'e_val' };

        const objectStruct = { a: { b: 'b_val', c: embeddedStruct}, d: embeddedStruct };
        const resultStruct = updateOn('a.b', (val: string) => val + '_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['d']).toBe(embeddedStruct);
        expect(resultStruct['a']['c']).toBe(embeddedStruct);
        expect(resultStruct['a']).not.toBe(objectStruct['a']);

        expect(resultStruct['a']['b']).toBe('b_val_new');

        // changes
        resultStruct['a']['b'] = 'b_val_changed';
        expect(objectStruct['a']['b']).toBe('b_val');
    });


    it('update - third layer', () => {


        const objectStruct = { a: { b: { c: 'c_val'} }};
        const resultStruct = updateOn('a.b.c', (val: string) => val + '_new')(objectStruct);

        expect(resultStruct['a']['b']['c']).toBe('c_val_new');
    });
});