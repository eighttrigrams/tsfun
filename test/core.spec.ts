import {jsonClone, wrap} from '../src/core';
import {intersect} from '../src/collections/arrays_set_like';

export function main() {

    describe('Core', () => {

        it('wrap',() =>
            expect(

                wrap(jsonClone)(intersect([1, 2]))
                ([2, 4]))

                .toEqual([2]));
    });
}