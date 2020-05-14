import {assoc, map} from '../../../src/associative';
import {val} from '../../../src/composition';

/**
 * tsfun | assoc
 *
 * @author Daniel de Oliveira
 */
describe('assoc', () => {

    it('array', () =>
       expect(

           assoc(3, 8)([1, 5, 7, 9])

       ).toEqual([1, 5, 7, 8]));


    it('object', () =>
        expect(

            assoc('b', 8)({a: 3, b: 7})

        ).toEqual({a: 3, b: 8}));


    it('array - ignore undefined indices', () => {

        const result = assoc(3, 8)([11, 12]);
        expect(result[3]).toEqual(8);
        expect(result[2]).toBeUndefined();
    });


    it('pitfall', () => {

        const result = map(assoc('a', {}))([{a: 1}, {a: 1}]) as Array<{a: number}>;
        expect(result[0].a).toBe(result[1].a); // this is possibly not be what one wants

        // to circumvent this, we use it like this
        const result2 = map(assoc('a', () => ({})))([{a: 1}, {a: 1}]) as Array<{a: any}>;
        expect(result2[0].a).toEqual({});
        expect(result2[0].a).not.toBe(result[1].a);
    });
});