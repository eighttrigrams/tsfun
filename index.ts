export {
    NestedArray,
    Pair,
    Either,
    ArrayList,
    ArraySet,
    ObjectCollection,
    ObjectSet,
    ObjectStruct,
    UntypedObjectCollection,
    ObjectMap
} from './src/type';

export {
    identity // TODO review if putting to composition package
} from './src/core';

export {
    isNot,
    not,
    isDefined,
    defined,
    isUndefined,
    has,
    hasNot,
    isUndefinedOrEmpty,
    undefinedOrEmpty,
    isEmpty,
    empty,
    isArray,
    isObject
} from './src/predicate';


export {
    is,
    isnt,
    arrayEqual,
    arrayEqualBy,
    arrayEquivalent,
    arrayEquivalentBy,
    equal,
    equalBy,
    equalTo,
    equivalent,
    objectEqual,
    objectEqualBy,
    tripleEqual,
    includedIn,
    includedInBy,
    differentFrom,
    differentFromBy,
    containedIn,
    containedInBy,
    jsonEqual,
    on,
    without,
    by
} from './src/comparator';

export {
    compose,
    flow,
    cond,
    val
} from './src/composition';


export {
    reverse,
    flatMap,
    flatten,
    filter,
    remove,
    map,
    forEach,
    forEachRight,
    reduce,
    append,
    prepend,
    separate,
    take,
    takeRight,
    takeRightWhile,
    takeUntil,
    takeWhile,
    takeNth,
    dropWhile,
    drop,
    dropRight,
    dropRightWhile,
    apply,
    copy,
    nth,
    nthOr,
    indices,
    arrayList,
    range,
    zip,
    zipWith
} from './src/arraylist';


export {
    lRange,
    lZip,
    lZipWith,
    lTake,
    lMap,
    lFilter
} from './src/arraylist_lazy';


export {
    asyncFilter,
    asyncForEach,
    asyncMap,
    asyncReduce
} from './src/arraylist_async';



export {
    intersection,
    intersectionBy,
    union,
    unionBy,
    intersect,
    intersectBy,
    subtract,
    subtractBy,
    unite,
    uniteBy,
    unique,
    uniqueBy,
    duplicates
} from './src/arrayset';


export {
    subtractObj,
    intersectObj,
    uniteObj,
    unionObject
} from './src/objectset'


export {
    mapObj,
    filterObj,
    intoObj,
    copyObj,
} from './src/objectcoll'


export {
    lookup
} from './src/objectmap'


export {
    to,
    setOn,
    jsonClone,
    getOn,
    getOnOr,
    clone,
    assoc,
    update
} from './src/objectstruct';


// TODO make
// .filter(on('pathType')(or(isNot(defined), 'sameRank'))