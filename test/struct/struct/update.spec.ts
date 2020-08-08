import {update} from '../../../src/struct';
import {equal} from '../../../src/comparator';
import {map} from '../../../src/associative';
import {Map} from '../../../src/type';


/**
 * tsfun/struct | struct
 */
describe('struct/update', () => {

    it('update - first layer', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = { a: 'a_val', c: embeddedStruct };
        const resultStruct = update('a', (val: string) => val + '_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['a']).toBe('a_val_new');
        expect(resultStruct['c']).toBe(embeddedStruct);

        // changes
        resultStruct['a'] = 'a_val_changed';
        expect(objectStruct['a']).toBe('a_val');
    })


    it('update - first layer - by array', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = { a: 'a_val', c: embeddedStruct };
        const resultStruct = update(['a'], (val: string) => val + '_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['a']).toBe('a_val_new');
        expect(resultStruct['c']).toBe(embeddedStruct);

        // changes
        resultStruct['a'] = 'a_val_changed';
        expect(objectStruct['a']).toBe('a_val');
    })


    it('update - second layer', () => {

        const embeddedStruct = { e: 'e_val' };

        const objectStruct = { a: { b: 'b_val', c: embeddedStruct}, d: embeddedStruct };
        const resultStruct = update('a.b', (val: string) => val + '_new')(objectStruct);

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
        const resultStruct = update('a.b.c', (val: string) => val + '_new')(objectStruct);

        expect(resultStruct['a']['b']['c']).toBe('c_val_new');
    })


    // assoc mode

    it('create path', () =>
        expect(

            equal({ a: { b: { c: 3 }}})(update('a.b.c', 3)({}))

        ).toBeTruthy());


    it('create path - by array', () =>
        expect(

            equal({ a: { b: { c: 3 }}})(update(['a', 'b', 'c'], 3)({}))

        ).toBeTruthy());


    it('object - first level', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = { a: 'a_val', c: embeddedStruct };
        const resultStruct = update('a', 'a_val_new')(objectStruct);

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
        const resultStruct = update('[0]', 'a_val_new')(objectStruct);

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
        const resultStruct = update('a.b', 'b_val_new')(objectStruct);

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
        const resultStruct = update('[0].b', 'b_val_new')(objectStruct);

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
        const resultStruct = update('[0][0]', 'b_val_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct[1]).toBe(embeddedStruct);
        expect(resultStruct[0][1]).toBe(embeddedStruct);
        expect(resultStruct[0]).not.toBe(objectStruct[0]);

        expect(resultStruct[0][0]).toBe('b_val_new');

        // changes do not affect original
        resultStruct[0][0] = 'b_val_changed';
        expect(objectStruct[0][0]).toBe('b_val');
    });


    it('update - third layer', () => {


        const objectStruct = { a: { b: { c: 'c_val'} }};
        const resultStruct = update('a.b.c', 'c_val_new')(objectStruct);

        expect(resultStruct['a']['b']['c']).toBe('c_val_new');
    });


    it('first level object - second level array - third level object', () => {

        const embeddedStruct = { e: 'e_val' };

        const objectStruct: any = { a: [{f: 'f_val', g: embeddedStruct}, embeddedStruct], d: embeddedStruct };
        const resultStruct = update('a[0].f', 'f_val_new')(objectStruct);

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
        const resultStruct = update('[0].f[0]', 'f_val_new')(objectStruct);

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


    it('pitfall', () => {

        const result = map(update('a.b', {}))([{a: {b: 1}}, {a: {b: 1}}]) as Array<Map>;
        expect(result[0].a.b).toBe(result[1].a.b); // this is possibly not be what one wants

        // to circumvent this, we use it like this
        const result2 = map(update('a.b', () => ({})))([{a: {b: 1}}, {a: {b: 1}}]) as Array<Map>;
        expect(result2[0].a.b).toEqual({});
        expect(result2[0].a.b).not.toBe(result[1].a.b)
    });


    it('set undefined', () =>
        expect(

            update('a', undefined)({ a: 3 })

        ).toEqual({ a: undefined })
    )
})
