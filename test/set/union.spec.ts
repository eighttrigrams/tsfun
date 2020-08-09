import {union} from "../../src/set";
import {jsonEqual} from '../../src/comparator';

/**
 * tsfun | union
 */
describe('union', () => {

    it('union ',() =>
        expect(

            union([[1, 2],[3, 4],[2, 4]]))

            .toEqual([1, 2, 3, 4]))


    it('string ',() =>
        expect(

            union(['12','34','24']))

            .toEqual('1234'))


    it('comparator', () =>
        expect(

            union<any>(jsonEqual, [[{a: 'a'}, {c: 'c'}], [{c: 'c'}, {d: 'd'}]]))

            .toEqual([{a: 'a'}, {c: 'c'}, {d: 'd'}]))
})
