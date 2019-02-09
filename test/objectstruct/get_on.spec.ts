import {getOn, getOnOr} from "../../src/objectstruct";

/**
 * @author Daniel de Oliveira
 */
describe('getOn / getOnOr', () => {


    it('getOnOr',() =>
        expect(

            getOnOr({a: {b: 4}}, undefined)('a.b'))

            .toEqual(4));


    it('getOnOr - undefined',() =>
        expect(

            getOnOr({a: {b: 4}}, undefined)('c.d'))

            .toEqual(undefined));


    it('getOnOr - alternative',() =>
        expect(

            getOnOr({a: {b: 4}}, 8)('c.d'))

            .toEqual(8));


    it('wrap - with getElForPathIn and false',() =>
        expect(

            getOnOr({a: false}, undefined)('a'))

            .toEqual(false));


    // getOn

    it('getOn nothing object',() =>
        expect(

            () => getOn({a: {b: 4}})('c.d'))

            .toThrow(Error('getOn, got nothing')));
});
