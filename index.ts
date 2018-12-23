export {
    NestedArray,
    Pair
} from './src/types';

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
    isTrue,
    isFalse,
    isArray,
    isObject
} from './src/predicates';


export {
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
    biggerThan,
    smallerThan,
    sameOn
} from './src/comparators';

export {
    compose,
    flow,
    composition
} from './src/composition';


export {
    reverse,
    flatMap,
    filter,
    map,
    append,
    prepend,
    separate,
    take,
    takeRightWhile,
    takeUntil,
    takeWhile,
    takeNth,
    dropWhile,
    drop,
    dropRight,
    dropRightWhile,
    getIth,
    getIthOr
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
    subtractObject,
    intersectObject,
    uniteObject,
    unionObject
} from './src/objectset'


export {
    mapObject,
    filterObject,
    intoObject
} from './src/objects_coll'


export {copy} from './src/arraylist_objectcoll';

export {by} from './src/core';

export {get} from './src/arraylist_struct';

export {doWhen, addTo, mapTo} from './src/utils';

export {
    takeOrMake,
    option,
    to,
    jsonClone
} from './src/struct';


// TODO make
// .filter(on('pathType')(or(isNot(defined), 'sameRank'))