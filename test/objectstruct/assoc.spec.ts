import {assoc} from '../../src/objectstruct';


describe('assoc', () => {


    it('object - first level', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = { a: 'a_val', c: embeddedStruct };
        const resultStruct = assoc('a', 'a_val_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['a']).toBe('a_val_new');
        expect(resultStruct['c']).toBe(embeddedStruct);

        // changes do not affect original
        resultStruct['a'] = 'a_val_changed';
        expect(objectStruct['a']).toBe('a_val');
    });


    it('array - first level', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = ['a_val', embeddedStruct];
        const resultStruct = assoc('[0]', 'a_val_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct[0]).toBe('a_val_new');
        expect(resultStruct[1]).toBe(embeddedStruct);

        // changes do not affect original
        resultStruct[0] = 'a_val_changed';
        expect(objectStruct[0]).toBe('a_val');
    });


    it('first level object - second level object', () => {

        const embeddedStruct = { e: 'e_val' };

        const objectStruct = { a: { b: 'b_val', c: embeddedStruct}, d: embeddedStruct };
        const resultStruct = assoc('a.b', 'b_val_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['d']).toBe(embeddedStruct);
        expect(resultStruct['a']['c']).toBe(embeddedStruct);
        expect(resultStruct['a']).not.toBe(objectStruct['a']);

        expect(resultStruct['a']['b']).toBe('b_val_new');

        // changes do not affect original
        resultStruct['a']['b'] = 'b_val_changed';
        expect(objectStruct['a']['b']).toBe('b_val');
    });


    it('first level array - second level object', () => {

        const embeddedStruct = { e: 'e_val' };

        const objectStruct: any = [{ b: 'b_val', c: embeddedStruct}, embeddedStruct];
        const resultStruct = assoc('[0].b', 'b_val_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct[1]).toBe(embeddedStruct);
        expect(resultStruct[0]['c']).toBe(embeddedStruct);
        expect(resultStruct[0]).not.toBe(objectStruct[0]);

        expect(resultStruct[0]['b']).toBe('b_val_new');

        // changes do not affect original
        resultStruct[0]['b'] = 'b_val_changed';
        expect(objectStruct[0]['b']).toBe('b_val');
    });


    it('first level array - second level array', () => {

        const embeddedStruct = { e: 'e_val' };

        const objectStruct: any = [['b_val', embeddedStruct], embeddedStruct];
        const resultStruct = assoc('[0][0]', 'b_val_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct[1]).toBe(embeddedStruct);
        expect(resultStruct[0][1]).toBe(embeddedStruct);
        expect(resultStruct[0]).not.toBe(objectStruct[0]);

        expect(resultStruct[0][0]).toBe('b_val_new');

        // changes do not affect original
        resultStruct[0][0] = 'b_val_changed';
        expect(objectStruct[0][0]).toBe('b_val');
    });


    it('assoc - third layer', () => {


        const objectStruct = { a: { b: { c: 'c_val'} }};
        const resultStruct = assoc('a.b.c', 'c_val_new')(objectStruct);

        expect(resultStruct['a']['b']['c']).toBe('c_val_new');
    });


    it('first level object - second level array - third level object', () => {

        const embeddedStruct = { e: 'e_val' };

        const objectStruct: any = { a: [{f: 'f_val', g: embeddedStruct}, embeddedStruct], d: embeddedStruct };
        const resultStruct = assoc('a[0].f', 'f_val_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['d']).toBe(embeddedStruct);
        expect(resultStruct['a'][1]).toBe(embeddedStruct);
        expect(resultStruct['a'][0]['g']).toBe(embeddedStruct);
        expect(resultStruct['a']).not.toBe(objectStruct['a']);
        expect(resultStruct['a'][0]).not.toBe(objectStruct['a'][0]);

        expect(resultStruct['a'][0]['f']).toBe('f_val_new');

        // changes do not affect original
        resultStruct['a'][0]['f'] = 'f_val_changed';
        expect(objectStruct['a'][0]['f']).toBe('f_val');
    });


    it('first level array - second level object - third level array', () => {

        const embeddedStruct = { e: 'e_val' };

        const objectStruct: any = [{f: ['f_val', embeddedStruct], g: embeddedStruct}, embeddedStruct ];
        const resultStruct = assoc('[0].f[0]', 'f_val_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct[1]).toBe(embeddedStruct);
        expect(resultStruct[0]['g']).toBe(embeddedStruct);
        expect(resultStruct[0]['f'][1]).toBe(embeddedStruct);
        expect(resultStruct[0]).not.toBe(objectStruct[0]);
        expect(resultStruct[0]['f']).not.toBe(objectStruct[0]['f']);

        expect(resultStruct[0]['f'][0]).toBe('f_val_new');

        // changes do not affect original
        resultStruct[0]['f'][0] = 'f_val_changed';
        expect(objectStruct[0]['f'][0]).toBe('f_val');
    });
});