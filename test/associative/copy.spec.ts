import {copy} from '../../src/associative';


/**
 * `copy` creates a shallow copy of an associative collection.
 */
describe('copy', () => {

    it('array',() =>
        expect(

            copy([2,4]))

            .toEqual([2, 4]));


    it('array instance new, instance value same',() => {

        const instance = {a: 'hey'};
        const originalColl = [instance, 4];
        const copiedColl = copy(originalColl);

        expect(copiedColl).not.toBe(originalColl);
        expect(copiedColl[0]).toBe(instance);
    });


    it('object instance new, instance value same',() => {

        const instance = {a: 'hey'};
        const originalColl = {a: instance, b: 4};
        const copiedColl = copy(originalColl);

        expect(copiedColl).not.toBe(originalColl);
        expect(copiedColl['a']).toBe(instance);
    });


    it('copy - object, keys mixed numbers and strings',() =>
        expect(

            copy({a: 1, 2: 2}))

            .toEqual({a: 1, 2: 2}));


    it('copy - retain existent keys with undefined properties',() =>

        expect(

            copy({a: 1, 2: undefined}))

            .toEqual({a: 1, 2: undefined}));
});