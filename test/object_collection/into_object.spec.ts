import {intoObject} from '../../src/objects_coll';


describe('intoObject', () => {

    it('number key', () =>
        expect(

            intoObject('key', 'val')
                ({}, {key: 2, val: 7}))

            .toEqual({2: 7}));


    it('string key', () =>
        expect(

            intoObject('key', 'val')
            ({}, {key: '2', val: 7}))

            .toEqual({2: 7}));


    it(' with reduce', () =>
        expect(

            [{key: 2, val: 7}, {key: 3, val: 8}]
                .reduce(intoObject('key', 'val'), {}))

            .toEqual({2: 7, 3: 8}));


    it('missing key', () =>
        expect(

            [{key: 2, val: 7}, {val: 8}]
                .reduce(intoObject('key', 'val'), {}))

            .toEqual({2: 7}));


    it('missing val', () =>
        expect(

            [{key: 2, val: 7}, {key: 8}]
                .reduce(intoObject('key', 'val'), {}))

            .toEqual({2: 7, 8: undefined}));


    // to see if typing works


});