import {defined} from '../../src/predicate';


describe('defined', () => {


    it('defined',() =>
        expect(

            defined(true))

            .toEqual(true));
});