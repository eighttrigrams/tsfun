import {intersectObject} from '../../../src/collections/objects_set_like';


describe('intersectObject', () => {



    it('intersectObject', () =>
        expect(

            intersectObject({1: 4})({1: 3, 2: 4}))

            .toEqual({1: 4}));


    it('array', () =>
        expect(

            intersectObject([1])({1: 3, 2: 4}))

            .toEqual({1: 3}));


    it('intersect Map- array for o', () =>
        expect(

            () => intersectObject({1: 3, 2: 4})([1]))

            .toThrow(new TypeError('invalid argument')));


    it('intersectObject - retain instance', () => {

        const instance = { a: 'hey'  };
        expect(
            intersectObject({1: instance})({1: instance, 2: 4})[1]
        ).toBe(instance);
    });
});
