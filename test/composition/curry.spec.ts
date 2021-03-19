import { curry } from "../../src/composition"


/**
 * tsfun | curry
 */
describe('curry', () => {
    
    const add2 = (a, b) => a + b
    const add3 = (a, b, c) => a + b + c
    const add4 = (a, b, c, d) => a + b + c + d

    it('curry - 2 args', () => 
        
        expect(
            
            curry(add2, 1)(2)

        ).toBe(3)
    )


    it('curry - 3 args', () => 
        
        expect(
            
            curry(add3, 1, 2)(3)

        ).toBe(6)
    )


    it('curry - 4 args', () => 
        
        expect(
            
            curry(add4, 1, 2, 3)(4)

        ).toBe(10)
    )
})
