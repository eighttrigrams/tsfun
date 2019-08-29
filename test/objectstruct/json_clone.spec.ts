import {clone, jsonClone} from "../../src/objectstruct";

describe('jsonClone', () => {


    it('clone date with jsonClone', () => {

        const d = new Date();
        const dJsonCloned = jsonClone(d);

        const k = clone([d]);
        expect(k[0]).toEqual(dJsonCloned);
    });
});
