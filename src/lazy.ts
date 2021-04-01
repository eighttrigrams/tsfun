// ------------------------ Lazy list functions ---------------------------------------

// see https://codewords.recurse.com/issues/four/lazy-composable-and-modular-javascript


/**
 * tsfun | lRange
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/lazy/l_range.spec.ts
 */
export function* lRange(a: number, b?: number, stepSize: number = 1) {

    let begin = a
    let end   = b
    if (b === undefined) {
        begin = 0
        end   = a
    }

    for (let i = begin; i < (end as number); i = i + stepSize) {
        yield i
    }
}


/**
 * tsfun | lZip
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/lazy/l_zip.spec.ts
 */
export function lZip(as: any) { return function* (bs: any) {

    const aIterator = as[Symbol.iterator]()
    const bIterator = bs[Symbol.iterator]()

    while (true) {
        const aNext = aIterator.next()
        if (aNext.done) break
        const bNext = bIterator.next()
        if (bNext.done) break
        yield [aNext.value, bNext.value]
    }
}}


/**
 * tsfun | lMap
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/lazy/l_map.spec.ts
 */
export function lMap(f: Function) {
    return function*(a: any) {
        for (let x of a) {
            // console.log("map x of a", x)
            yield f(x)
        }
    }
}


/**
 * tsfun | lTake
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/lazy/l_take.spec.ts
 */
export function lTake(n: number) {
    return function*(a: any) {
        let i = 0
        for (let x of a) {
            if (i === n) return
            // console.log("take x of a", x)
            yield x
            i++
        }
    }
}


/**
 * tsfun | lFilter
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/lazy/l_filter.spec.ts
 */
export function lFilter(f: Function) {
    return function*(a: any) {
        for (let x of a) {
            // console.log("filter x of a", x)
            if (f(x)) yield x
        }
    }
}


/**
 * tsfun | materialize
 *
 * Examples:
 *
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/lazy/materialize.spec.ts
 */
export function materialize(lAs: any) {
    const as: Array<any> = []
    for (let x of lAs) {
        // console.log("materialize x of a", x)
        as.push(x)
    }
    return as
}
