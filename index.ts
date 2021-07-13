export {
    clone,
    detach,
    to,
    update,
    $getElForPathIn,
} from './src/struct'

export type {
    Map,
    Pair,
    Just,
    Nothing,
    Predicate,
    Singleton,
    Maybe,
    Failure,
    Success,
    Err,
    Ok,
    Either,
    Associative,
    Fallible,
    Mapping,
    Effect,
    Array1,
    Array2,
    Key,
    Path,
    Comparator,
} from './src/type'


export {
    identity
} from './src/core'

export {
    not,
    and,
    or,
    xor,
    isArray,
    isObject,
    isAssociative,
    isPrimitive,
    isSingleton,
    isNumber,
    isBoolean,
    isFunction,
    isNot,
    isDefined,
    isString,
    isUndefinedOrEmpty,
    isEmpty,
    isUndefined,
    isOk,
    isErr,
    isEither,
    isMaybe,
    isPair
} from './src/predicate'


export {
    is,
    isnt,
    sameset,
    equal,
    same,
    includedIn,
    includes,
    differentFrom,
    subsetOf,
    by,
    on,
    gt,
    gte,
    startsWith,
    endsWith,
    lt,
    lte
} from './src/comparator'


export {
    compose,
    flow,
    cond,
    conds,
    curry,
    pipe,
    otherwise,
    nop,
    val,
    throws,
    collect,
    apply
} from './src/composition'


export {
    left,
    right,
    value,
    ok,
    err,
    tuplify,
    pairWith,
    swap,
    nothing,
    success,
    failure,
    just,
    singleton,
    pair,
    L,
    R
} from './src/tuple'


export {
    flatMap,
    range,
    dense,
    separate,
    distribute,
    flatten,
    take,
    takeRight,
    takeRightWhile,
    takeWhile,
    dropWhile,
    dropRightWhile,
    dropRight,
    drop,
    append,
    prepend,
    zip,
    takeUntil,
    reverse,
    first,
    rest,
    last,
    takeNth,
    sort
} from './src/array'


export {
    duplicates,
} from './src/set'


export {
    intersection,
    union,
    set,
    intersect,
    subtract,
    unite
} from './src/set'


export {
    assoc,
    filter,
    remove,
    lookup,
    keys,
    values,
    keysValues,
    map,
    reduce,
    Filter,
    count,
    stop,
    size,
    forEach,
    prune,
    indices,
    copy,
    any,
    all
} from './src/associative'


export {
    aFilter,
    aReduce,
    aMap,
    aFlow,
    aCompose
} from './src/async'
