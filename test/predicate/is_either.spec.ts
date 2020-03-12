import {isEither} from '../../src/predicate';

/**
 * tsfun | isEither
 *
 * @author Daniel de Oliveira
 */
describe('isEither', () => {

   it('success', () =>
       expect(

           isEither([undefined, 3])

       ).toEqual(true)
   );


    it('failure', () =>
        expect(

            isEither([3, undefined])

        ).toEqual(true)
    );


    it('2 undefined', () =>
        expect(

            isEither([undefined, undefined])

        ).toEqual(false)
    );


    it('2 defined', () =>

        expect(

            isEither([3, 3])

        ).toEqual(false)
    );
});