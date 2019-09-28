import {is} from '../../src/comparator';
import {flow} from '../../src/composition';
import {mapOption, option, to} from '../../src/objectstruct';
import {on} from 'tsfun-core';


/**
 * @author Daniel de Oliveira
 */
describe('mapOption - experimental', () => {

    // mapOption

    it('mapOption', () =>
        expect(

            flow<any>({a:{b:4}},
                option(on('a.b', is(4))),
                mapOption(to('a.b'))))

            .toEqual(4));


    it('mapOption on empty option', () =>
        expect(

            flow<any>({a:{b:4}},
                option(on('a.b', is(5))),
                mapOption((_: any) => _ + 2)))

            .toEqual({}));

});