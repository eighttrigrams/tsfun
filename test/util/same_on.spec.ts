import {sameOn} from '../../src/util';

/**
 * @author Daniel de Oliveira
 */
describe('sameOn', () => { // TODO rename to isOn, but also could be done with on( ... , is( ... )

    it('sameOn - same path',() =>
        expect(

            sameOn('a.b', {a: {b: 5}}, {a: {b: 5}}))

            .toEqual(true));


    it('sameOn - arrays not allowed',() =>
        expect(

            sameOn('a.b', [5], [5]))

            .toEqual(true));
});
