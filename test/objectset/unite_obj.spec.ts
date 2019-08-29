import {uniteObj} from '../../src/objectset';


describe('uniteObj', () => {


    it('overwrite', () =>
        expect(

            uniteObj({1: 4})({1: 3, 2: 4}))

            .toEqual({1: 4, 2: 4}));


    it('unite different', () =>
        expect(

            uniteObj({1: 4})({2: 4}))

            .toEqual({1: 4, 2: 4}));


    it('illegal first arg', () =>
        expect(

            () => uniteObj([])({2: 4}))

            .toThrow(new TypeError('invalid argument')));


    it('illegal second arg', () =>
        expect(

            () => uniteObj({1: 4})([]))

            .toThrow(new TypeError('invalid argument')));


    it('retain instance', () => {

        const instance = { a: 'hey'  };
        expect(uniteObj({1: 4})({1: 3, 2: instance})[2])
            .toBe(instance);
    });


    it('variadic', () =>
        expect(

            uniteObj(...[{3: 4}, {4: 4}])({1: 2}))

            .toEqual({1: 2, 3: 4, 4: 4}));


    it('variadic', () =>
        expect(

            uniteObj(...[{3: 4}, {4: 4}])({1: 2}))

            .toEqual({1: 2, 3: 4, 4: 4}));
});
