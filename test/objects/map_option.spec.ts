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
import {mapOption, option, to} from '../../src/objects';
import {flow} from '../../src/flow';
import {on} from '../../src/comparators';


describe('Objects', () => {




    // mapOption

    it('mapOption', () =>
        expect(

            flow<any>({a:{b:4}},
                option(on('a.b:')(4)),
                mapOption(to('a.b'))))

            .toEqual(4));


    it('mapOption on empty option', () =>
        expect(

            flow<any>({a:{b:4}},
                option(on('a.b:')(5)),
                mapOption((_: any) => _ + 2)))

            .toEqual({}));

});