export {
    clone,
    dissoc,
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
    Either,
    Associative,
    Fallible,
    Mapping,
    Effect,
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
    defined,
    undefinedOrEmpty,
    empty,
    and,
    or,
    xor,
    isArray,
    isObject,
    isAssociative,
    isSingleton,
    isNumber,
    isBoolean,
    isFunction,
    isNot, isDefined,
    isString,
    isUndefinedOrEmpty, isEmpty, isUndefined,
    isSuccess, isFailure, isEither, isMaybe, isPair
} from './src/predicate'


export {
    is,
    isnt,
    tripleEqual,
    arrayEqual,
    sameset,
    equal,
    objectEqual,
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
    otherwise,
    nop,
    val,
    throws,
    collect,
    mcompose,
    mmatch,
    apply
} from './src/composition'


export {
    left,
    right,
    value,
    getSuccess,
    tuplify,
    pairWith,
    swap,
    liftE,
    liftM,
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
    update_a,
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
    aCompose,
    aMcompose
} from './src/async'


export {
    materialize,
    lZip,
    lFilter,
    lTake,
    lMap,
    lRange,
} from './src/lazy'
