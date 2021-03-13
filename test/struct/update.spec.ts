import {path, update} from '../../src/struct';
import {equal} from '../../src/comparator';
import {map} from '../../src/associative';
import {Map} from '../../src/type';
import { flow } from '../../src/composition';


/**
 * tsfun | update
 */
describe('update', () => {

    const times2 = x => x * 2

    it('object - update - 1 param list', () =>
        expect(

            update('a', times2, { a: 4 })

        ).toEqual({ a: 8 }))


    it('record - update - 1 param list', () =>
        expect(

            update('a', times2, { a: 4, b: 3 } as Record<string, number>)

        ).toEqual({ a: 8, b: 3 }))


    it('map - update - 1 param list', () =>
        expect(

            update('a', times2, { a: 4, b: 3 } as {[_:string]: number})

        ).toEqual({ a: 8, b: 3 }))

    
    it('array - update - 1 param list', () =>
        expect(

            update(0, times2, [4])

        ).toEqual([8]))


    it('object - update - 2 param lists', () =>
        expect(

            update('a', times2)({ a: 4 })

        ).toEqual({ a: 8 }))

    
    it('array - update - 2 param lists', () =>
        expect(

            update(0, times2)([4])

        ).toEqual([8]))
    

    it('for use in compositions', () =>
        expect(

            flow({ a: 4 }
            , update('a', times2)
            )

        ).toEqual({ a: 8 }))


    interface A { a: number, b: string }
    const object: A = { a: 4, b: 'four' }

    it('object - first level - assoc - single param list', () =>
        expect(

            update('a', 3, object)

        ).toEqual({ a: 3, b: 'four' })
    )


    it('multiple parameter lists', () =>
        expect(

            update('a', 3)(object)

        ).toEqual({ a: 3, b: 'four' })
    )

    
    it('for use in composition', () =>
        expect(

            flow(object
                , update('a', 3))

        ).toEqual({ a: 3, b: 'four' })
    )

    // struct use case

    it('object-struct - update - first level - 2 param lists', () => {

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


    it('object-struct - update - first level - 1 param list', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = { a: 'a_val', c: embeddedStruct };
        const resultStruct = update(['a'], (val: string) => val + '_new', objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['a']).toBe('a_val_new');
        expect(resultStruct['c']).toBe(embeddedStruct);

        // changes
        resultStruct['a'] = 'a_val_changed';
        expect(objectStruct['a']).toBe('a_val');
    })


    it('object-struct - assoc - first level - 1 param list', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = { a: 'a_val', c: embeddedStruct };
        const resultStruct = update(path('a'), 'a_val_new', objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['a']).toBe('a_val_new');
        expect(resultStruct['c']).toBe(embeddedStruct);

        // changes do not affect original
        resultStruct['a'] = 'a_val_changed';
        expect(objectStruct['a']).toBe('a_val');
    });


    it('object-struct - assoc - first level - 1 param list', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = { a: 'a_val', c: embeddedStruct };
        const resultStruct = update(path('a'), 'a_val_new', objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['a']).toBe('a_val_new');
        expect(resultStruct['c']).toBe(embeddedStruct);

        // changes do not affect original
        resultStruct['a'] = 'a_val_changed';
        expect(objectStruct['a']).toBe('a_val');
    });


    it('array-struct - assoc - first level - 1 param list', () => {

        const embeddedStruct = { d: 'd_val'};

        const arrayStruct = ['a_val', embeddedStruct];
        const resultStruct = update(path('0'), 'a_val_new', arrayStruct);

        expect(resultStruct).not.toBe(arrayStruct);
        expect(resultStruct[0]).toBe('a_val_new');
        expect(resultStruct[1]).toBe(embeddedStruct);

        // changes do not affect original
        resultStruct[0] = 'a_val_changed';
        expect(arrayStruct[0]).toBe('a_val');
    });


    it('object-struct - update - second level - 2 param lists', () => {

        const embeddedStruct = { e: 'e_val' };

        const objectStruct = { a: { b: 'b_val', c: embeddedStruct}, d: embeddedStruct };
        const resultStruct = update(path('a.b'), (val: string) => val + '_new')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['d']).toBe(embeddedStruct);
        expect(resultStruct['a']['c']).toBe(embeddedStruct);
        expect(resultStruct['a']).not.toBe(objectStruct['a']);

        expect(resultStruct['a']['b']).toBe('b_val_new');

        // changes
        resultStruct['a']['b'] = 'b_val_changed';
        expect(objectStruct['a']['b']).toBe('b_val');
    });


    it('object-struct - update - third layer - 2 param lists', () => {


        const objectStruct = { a: { b: { c: 'c_val'} }};
        const resultStruct = update(path('a.b.c'), (val: string) => val + '_new')(objectStruct);

        expect(resultStruct['a']['b']['c']).toBe('c_val_new');
    })


    it('object-struct - create path', () =>
        expect(

            equal({ a: { b: { c: 3 }}})(update(path('a.b.c'), 3)({}))

        ).toBeTruthy());


    it('array - first level', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = ['a_val', embeddedStruct];
        const resultStruct = update(path('0'), 'a_val_new')(objectStruct);

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
        const resultStruct = update(path('a.b'), 'b_val_new')(objectStruct);

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
        const resultStruct = update(path('[0].b'), 'b_val_new')(objectStruct);

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
        const resultStruct = update(path('[0][0]'), 'b_val_new')(objectStruct);

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
        const resultStruct = update(path('a.b.c'), 'c_val_new')(objectStruct);

        expect(resultStruct['a']['b']['c']).toBe('c_val_new');
    });


    it('first level object - second level array - third level object', () => {

        const embeddedStruct = { e: 'e_val' };

        const objectStruct: any = { a: [{f: 'f_val', g: embeddedStruct}, embeddedStruct], d: embeddedStruct };
        const resultStruct = update(path('a[0].f'), 'f_val_new')(objectStruct);

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
        const resultStruct = update(path('[0].f[0]'), 'f_val_new')(objectStruct);

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

        const result = map(update(path('a.b'), {}))([{a: {b: 1}}, {a: {b: 1}}]) as Array<Map>;
        expect(result[0].a.b).toBe(result[1].a.b); // this is possibly not be what one wants

        // to circumvent this, we use it like this
        const result2 = map(update(path('a.b'), () => ({})))([{a: {b: 1}}, {a: {b: 1}}]) as Array<Map>;
        expect(result2[0].a.b).toEqual({});
        expect(result2[0].a.b).not.toBe(result[1].a.b)
    });


    it('set undefined', () => {

        type A = { a: number|undefined }
        const result = update(path('a'), undefined)({ a: 3 } as A)
        expect(result).toEqual({ a: undefined })
    })


    it('typing', () => {

        interface A { a: number, b: string }

        // 1. key checking

        // When used with a single argument list, the key can get checked

        const result1: A = update('a', times2, { a: 7, b: '7' })
        const result2: A = update('a', times2, { a: 7, b: '4', c: 7 })
        // const result: A = update('c' /*!*/, times2, {a: 4, b: '7'}) // WRONG - the given key does not exist

        // With a separate argument lists, however, this gets not caught
        const result3: A = update('c' /*!*/, times2)({a: 4, b: '7'})   // WRONG, but passes
    })


    it('typing 2', () => {

        // 1. key checking

        // When used with a single argument list, the key can get checked

        const result1: A = update('a', 3, { a: 7, b: '7' })
        const result2: A = update('a', 3, { a: 7, b: '4', c: 7 })
        // const result: A = update('c' /*!*/, '4', {a: 4, b: '7'}) // WRONG - the given key does not exist

        // With a separate argument lists, however, this gets not caught
        const result3: A = update('c' /*!*/, '4')({a: 4, b: '7'})   // WRONG, but passes


        // 2. value checking

        // since the second param gets inferred as union type, we can only check if the inferred param is in the union
        const result7: A = update('a', '4', { a: 4, b: '7' })   // passes for the given reason
        // const result: A = update('a', [], { a: 4, b: '7' }) // WRONG

        // this however does not work anyway in case of multiple parameter lists, because the T gets inferred in the outer param list
        const result8: A = update('a', '4')({a: 7, b: '7'})
        const result6: A = update('a', [])({ a: 4, b: '7' })    // passes for the given reason
    })
})
