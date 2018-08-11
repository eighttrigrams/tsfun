export {
    NestedArray
} from './src/types';

export {
    isNot,
    isEven,
    even,
    isOdd,
    odd,
    isDefined,
    defined,
    isUndefined,
    isArray,
    isObject,
    isTrue,
    isFalse,
    isUndefinedOrEmpty,
    undefinedOrEmpty,
    isEmpty,
    empty
} from './src/predicates';


export {
    arrayEqual,
    arrayEqualBy,
    arrayEquivalent,
    arrayEquivalentBy,
    objectEqual,
    objectEqualBy,
    tripleEqual,
    includedIn,
    differentFrom,
    differentFromBy,
    containedIn,
    containedInBy,
    jsonEqual,
    onBy,
    on,
    biggerThan,
    smallerThan,
    sameOn
} from './src/comparators';


export {
    take,
    takeRightWhile,
    takeUntil,
    takeWhile,
    takeNth,
    dropWhile,
    drop,
    dropRight,
    dropRightWhile
} from './src/arrays/list_like_pick';


export {
    flow,
    flowP
} from './src/flow';


export {
    reverse,
    flatMap,
    mapTo,
    filter,
    map,
    getAtIndex,
    getAtIndexOr
} from './src/arrays/list_like';


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
} from './src/arrays/set_like';


export {
    subtractMap,
    intersectMap,
    uniteMap,
    unionMap
} from './src/maps/set_like'


export {
    mapMap,
    filterMap,
} from './src/maps/list_like'


export {copy} from './src/coll';

export {doWhen} from './src/utils';

export {
    getElForPathIn,
    takeOrMake,
    clone,
    to,
    option
} from './src/objects/core';