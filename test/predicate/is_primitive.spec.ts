import { isPrimitive } from "../../src/predicate"

/**
 * tsfun | isPrimitive
 */
describe('isPrimitive', () => {

    it('is', () => {

        expect(isPrimitive(undefined)).toBeTruthy()
        expect(isPrimitive(null)).toBeTruthy()
        expect(isPrimitive(1)).toBeTruthy()
        expect(isPrimitive(true)).toBeTruthy()
        expect(isPrimitive('')).toBeTruthy()
    })


    it('isnt', () => {

        expect(isPrimitive(() => {})).not.toBeTruthy()
        expect(isPrimitive({})).not.toBeTruthy()
        expect(isPrimitive([])).not.toBeTruthy()
        expect(isPrimitive(new Date())).not.toBeTruthy()
    })
})
