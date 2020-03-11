// ------------------------ Lazy list functions ---------------------------------------

// see https://codewords.recurse.com/issues/four/lazy-composable-and-modular-javascript


export function* range(a: number, b?: number, stepSize: number = 1) {

    let begin = a;
    let end   = b;
    if (b === undefined) {
        begin = 0;
        end   = a;
    }

    for (let i = begin; i < (end as number); i = i + stepSize) {
        yield i;
    }
}


export function zip(as: any) { return function* (bs: any) {

    const aIterator = as[Symbol.iterator]();
    const bIterator = bs[Symbol.iterator]();

    while (true) {
        const aNext = aIterator.next();
        if (aNext.done) break;
        const bNext = bIterator.next();
        if (bNext.done) break;
        yield [aNext.value, bNext.value];
    }
}}


export function zipWith(f: Function, as: any) { return function* (bs: any) {

    const aIterator = as[Symbol.iterator]();
    const bIterator = bs[Symbol.iterator]();

    while (true) {
        const aNext = aIterator.next();
        if (aNext.done) break;
        const bNext = bIterator.next();
        if (bNext.done) break;
        yield f(aNext.value, bNext.value);
    }
}}


export function map(f: Function) {
    return function*(a: any) {
        for (let x of a) {
            // console.log("map x of a", x);
            yield f(x)
        }
    }
}


export function take(n: number) {
    return function*(a: any) {
        let i = 0;
        for (let x of a) {
            if (i === n) return;
            // console.log("take x of a", x);
            yield x;
            i++;
        }
    }
}


export function filter(f: Function) {
    return function*(a: any) {
        for (let x of a) {
            // console.log("filter x of a", x);
            if (f(x)) yield x;
        }
    }
}


export function materialize(lAs: any) {
    const as: Array<any> = [];
    for (let x of lAs) {
        // console.log("materialize x of a", x);
        as.push(x);
    }
    return as;
}