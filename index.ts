export {
    sameAs,
    includedIn,
    differentFrom,
    differentFromBy,
    equalTo,
    onBy,
    on,
    biggerThan,
    smallerThan,
    sameOn,
    arrayEquivalent,
    objectEquivalent,
} from './src/comparators';
export {isNot, even, odd, isDefined, isUndefined} from './src/predicates'
export {take, takeRightWhile, takeUntil, takeWhile, takeNth} from './src/arrays/list_like_take';
export {dropWhile, drop, dropRight, dropRightWhile} from './src/arrays/list_like_drop';
export {flow, flowP} from './src/flow';
export {reverse, flatMap, mapTo, filter, map} from './src/arrays/list_like';
export {
    NestedArray,
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
    equals
} from './src/arrays/set_like';

export {
    subtractMap,
    intersectMap,
    uniteMap,
    unionMap
    // intersectionMap TODO implement
} from './src/maps/set_like'
export {
    mapMap,
    filterMap,
} from './src/maps/list_like'


export {copy, isEmpty} from './src/coll';
export {doWhen} from './src/core';

export {
    getElForPathIn,
    takeOrMake,
    clone,
    to,
    option
} from './src/objects/core';

// TODO add pipe method
// TODO add more powerful object comparison

/**
 * @author Daniel de Oliveira
 */




