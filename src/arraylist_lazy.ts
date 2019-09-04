// ------------------------ Lazy list functions ---------------------------------------

// see https://codewords.recurse.com/issues/four/lazy-composable-and-modular-javascript


export function* lRange(n: number) {

    for (let i = 0; i < n; i++) {
        yield i;
    }
}


export function lZip(as: any) { return function* (bs: any) {

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


export function lZipWith(f: Function, as: any) { return function* (bs: any) {

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


export function lMap(f: Function) {
    return function*(a: any) {
        for (let x of a) {
            // console.log("map x of a", x);
            yield f(x)
        }
    }
}


export function lTake(n: number) {
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


export function lFilter(f: Function) {
    return function*(a: any) {
        for (let x of a) {
            // console.log("filter x of a", x);
            if (f(x)) yield x;
        }
    }
}


export function materialize(lAs: any) {
    const as = [];
    for (let x of lAs) {
        // console.log("filter x of a", x);
        as.push(x);
    }
    return as;
}