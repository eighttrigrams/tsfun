import {isFunction} from '../../src/predicate';


describe('isFunction', () => {

    it('true',() =>
        expect(

            isFunction(() => {}))

            .toEqual(true));


    it('false',() =>
        expect(

            isFunction(3))

            .toEqual(false));
});