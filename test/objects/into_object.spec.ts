/**
 * takeOrMake
 *
 * option
 *
 * mapOption
 *
 * to
 *
 * intoObject
 */
import {intoObject} from '../../src/objects';


describe('intoObject', () => {



    // intoObject

    it('intoObject', () =>
        expect(

            intoObject(_ => [_.key, _.val])
                ({}, {key: 2, val: 7}))

            .toEqual({2: 7} as any));


    it('intoObject - with reduce', () =>
        expect(

            [{key: 2, val: 7}, {key: 3, val: 8}]
                .reduce(intoObject(_ => [_.key, _.val]), {}))

            .toEqual({2: 7, 3: 8} as any));


    it('intoObject - missing key', () =>
        expect(

            [{key: 2, val: 7}, {val: 8}]
                .reduce(intoObject(_ => [_.key, _.val]), {}))

            .toEqual({2: 7} as any));
});