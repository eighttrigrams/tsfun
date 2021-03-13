import { flow } from '../../src/composition';
import {dissoc} from '../../src/struct';

/**
 * tsfun | dissoc
 */
describe('dissoc', () => {

    it('simple case', () => {

        const objectStruct = { a: { b: 'c' }};
        const resultStruct = dissoc('a.b')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(resultStruct['a']['b']).toBeUndefined();
    });


    it('first layer', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = { a: 'a_val', c: embeddedStruct };
        const resultStruct = dissoc('c')(objectStruct);

        expect(resultStruct).not.toBe(objectStruct);
        expect(embeddedStruct['d']).toBe('d_val');
        expect(objectStruct['a']).toBe('a_val');
        expect(resultStruct['c']).toBeUndefined();
    });


    it('first layer - by array', () => {

        const embeddedStruct = { d: 'd_val' };

        const objectStruct = { a: 'a_val', c: embeddedStruct };
        const resultStruct = dissoc(['c'])(objectStruct);

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
    })


    it('do not create anything', () => {

        const objectStruct = {};
        const resultStruct = dissoc('a.c')(objectStruct);

        // does not create the a property, just to get to the 'c' property
        expect(resultStruct).toEqual({});
    })


    interface A { a?: number, b?: string }

    it('dissoc', () => {

        expect(dissoc('a')({ a: 4 } as A)).toEqual({ })
        expect(dissoc('a', { a: 4 } as A)).toEqual({ })
    })


    it('typing', () => {

        interface C { c: number }

        const result1: A = dissoc('a', { a: 7, b: '7' })
        const result2: A = dissoc('a', { a: 7, b: '4', c: 7 })
        const result4: A = dissoc('a')({a: 7, b: '7'})
        const result5: A = dissoc('a')({a: 7, b: '7', c: 7})

        // const result: A = dissoc('c' /*!*/, {a: 4, b: '7'}) // WRONG - the given key does not exist

        // const result: A = dissoc('a', {a: '4', b: '7'}) // WRONG
        // const result: A = dissoc('a')({a: '4', b: '7'}) // WRONG
        // const result: C = dissoc('c')({a: '4'}) // WRONG
        // const result: C = dissoc('c', {a: '4'}) // WRONG

        // since the second param gets inferred as union type, we can only check if the inferred param is in the union
        const result7: A = dissoc('a',  { a: 4, b: '7' }) // passes for the given reason

        // this however does not work anyway in case of multiple parameter lists, because the T gets inferred in the outer param list
        const result8: A = dissoc('a')({a: 7, b: '7'})   // passes for the given reason
        const result6: A = dissoc('a')({ a: 4, b: '7' }) // passes for the given reason



        // flow

        const result10: { a: any }
            = flow({ a: 7 }
            , dissoc('a')
            )
    })
})