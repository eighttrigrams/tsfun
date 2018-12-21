import {sameOn} from '../../src/comparators';

describe('sameOn', () => {






    // sameOn

    it('sameOn - same path',() =>
        expect(

            sameOn('a.b', {a: {b: 5}}, {a: {b: 5}}))

            .toEqual(true));


    it('sameOn - arrays not allowed',() =>
        expect(

            sameOn('a.b', [5], [5]))

            .toEqual(true));
});