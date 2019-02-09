import {intersectObj} from '../../src/objectset';


describe('intersectObj', () => {



    it('intersectObj', () =>
        expect(

            intersectObj({1: 4})({1: 3, 2: 4}))

            .toEqual({1: 4}));


    it('array', () =>
        expect(

            intersectObj([1])({1: 3, 2: 4}))

            .toEqual({1: 3}));


    it('intersect Map- array for o', () =>
        expect(

            () => intersectObj({1: 3, 2: 4})([1]))

            .toThrow(new TypeError('invalid argument')));


    it('intersectObj - retain instance', () => {

        const instance = { a: 'hey'  };
        expect(
            intersectObj({1: instance})({1: instance, 2: 4})[1]
        ).toBe(instance);
    });
});
