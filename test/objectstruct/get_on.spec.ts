import {getOn, getOnOr} from "../../src/objectstruct";

/**
 * @author Daniel de Oliveira
 */
describe('getOn / getOnOr', () => {


    it('getOnOr',() =>
        expect(

            getOnOr('a.b', undefined)({a: {b: 4}}))

            .toEqual(4));


    it('getOnOr - undefined',() =>
        expect(

            getOnOr('c.d', undefined)({a: {b: 4}}))

            .toEqual(undefined));


    it('getOnOr - alternative',() =>
        expect(

            getOnOr('c.d', 8)({a: {b: 4}}))

            .toEqual(8));


    it('wrap - with getElForPathIn and false',() =>
        expect(

            getOnOr('a', undefined)({a: false}))

            .toEqual(false));


    // getOn

    it('getOn nothing object',() =>
        expect(

            () => getOn({a: {b: 4}})('c.d'))

            .toThrow(Error('getOn, got nothing')));
});
