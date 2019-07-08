export {
    NestedArray,
    Pair
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
    when
} from './src/composition';


export {
    reverse,
    flatMap,
    flatten,
    filter,
    remove,
    asyncFilter,
    map,
    asyncMap,
    forEach,
    forEachRight,
    asyncForEach,
    reduce,
    asyncReduce,
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
    flatReduce,
    range
} from './src/arraylist';



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
    copyObj
} from './src/objectcoll'


export {
    to,
    setOn,
    jsonClone,
    getOn,
    getOnOr,
    clone
} from './src/objectstruct';


// TODO make
// .filter(on('pathType')(or(isNot(defined), 'sameRank'))