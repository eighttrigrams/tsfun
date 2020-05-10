import {jsonEqual} from '../../../src/comparator';


/**
 * tsfun | jsonEqual
 *
 * jsonEqual compares to objects by comparing their string representations
 * via `JSON.parse(JSON.stringify(item))`
 * which makes the order of keys matter
 */
describe('jsonEqual', () => {

    it('jsonEqual',() => {

        expect(jsonEqual({a: 'b', c: 'd'})({a: 'b', c: 'd'})).toEqual(true)
        expect(jsonEqual({a: 'b', c: 'd'}, {a: 'b', c: 'd'})).toEqual(true)
    })


    it('order matters',() =>
        expect(

            jsonEqual({a: 'b', c: 'd'})({c: 'd', a: 'b'}))

            .toEqual(false))


    it('typing', () => {

        const result1: boolean = jsonEqual({a: 3})({a: 3})
        const result2: boolean = jsonEqual({a: 3}, {a: 3})
        // const result3: boolean = jsonEqual([2])(['2']) // WRONG
        const result4: boolean = jsonEqual([2], ['2']) // WRONG, but passes
        // const result: boolean = jsonEqual({a: 3})({a: '3'}) // WRONG
        const result5: boolean = jsonEqual({a: 3}, {a: '3'}) // WRONG, but passes
        // const result: boolean = jsonEqual({a: 3}) // WRONG
        // const result: boolean = jsonEqual({a: 3}, 3) // WRONG
        const result6: boolean = jsonEqual({a: 3}, []) // WRONG, but passes
    })
})