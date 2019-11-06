import {dissoc} from '../../src/associative';


describe('dissoc', () => {

    it('array', () =>
        expect(

            dissoc(2)([1, 5, 7, 9])

        ).toEqual([1, 5, 9]));


    it('object', () =>
        expect(

            dissoc('b')({a: 3, b: 7})

        ).toEqual({a: 3}));


    it('instances', () => {

        const instance = {a: 3};
        const originalColl = [4, instance as any, 7, 9];
        const resultColl = dissoc(1)(originalColl);

        expect(resultColl).not.toBe(originalColl);
        expect(resultColl).toEqual([4, 7, 9]);
        expect(instance).toEqual({a: 3});
    });
});